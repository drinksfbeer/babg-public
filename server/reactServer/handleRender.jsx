/* eslint import/no-dynamic-require: 0 */
import { createStore } from 'redux';
import { matchPath } from 'react-router-dom';
import handleResponseAndStore from './handleResponseAndStore';
import routes from '../../src/components/routes';
import state from '../../src/redux/initialState';
import { fetchPromise } from '../../src/helpers/fetchApi';
// TODO find a way to log error to system with notifications and context of error.
const errorCatch = error => console.log(error); // eslint-disable-line 
const hostName = 'https://sfbeer-portal.herokuapp.com';
// hostName = 'http://localhost:3001'; // if you want to test development database you can change hostname to be whatever you want

async function handleRender(req, res) {
  const subdomain = req.headers.host.split('.')[0];
  const initialState = state(); // initialize redux store

  // Set development in redux to true if loaded in local host
  initialState.development = (req.headers.host.includes('localhost'));

  // Get Event default banner image no matter what
  const settings = await fetchPromise({
    url: '/api/v1/settings',
    hostName,
  }).catch(errorCatch);
  initialState.settings.list._list = settings;

  let currentChapter;
  if (subdomain) {
    const chapters = await fetchPromise({
      url: `/api/v1/chapters?subdomain=${subdomain}`,
      hostName,
    }); // check the chapters against current subdomain
    [currentChapter] = chapters; // grab first chapter in list (should only be one if exists)
    if (currentChapter) {
      initialState.currentChapter = currentChapter; // assign chapter to redux store
    }
    if (currentChapter) {
      //  Fetch all chapters for store even if current chapter exists
      const chaptersList = await fetchPromise({
        url: '/api/v1/chapters',
        hostName,
      }).catch(errorCatch);
      initialState.chapters.list._list = chaptersList || [];
    }
  }
  const queryParams = currentChapter ? currentChapter.uuid : 'non-chapter';
  // queryParams: modifier to filter by specific chapter

  const pages = await fetchPromise({
    url: `/api/v1/pages?chapterUuid=${queryParams}`,
    hostName,
  }).catch(errorCatch); // always pre fetch relevant pages for every request

  initialState.pages.list._list = pages || []; // modify store with result

  const activeRoute = routes.find(route => matchPath(req.url, route));
  if (activeRoute && activeRoute.prefetchResource) {
    const resource = activeRoute.prefetchResource;
    const resourceList = await fetchPromise({
      url: `/api/v1/${resource}${queryParams}`,
      hostName,
    }).catch(errorCatch);
    initialState[resource].list._list = resourceList || [];
  }
  const store = createStore(() => initialState);
  handleResponseAndStore(req, res, store);
}

module.exports = handleRender;
