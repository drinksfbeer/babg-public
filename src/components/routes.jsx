import PagesContainer from './pages/pageContainer';
import EventsContainer from './pages/events/eventsContainer';
import MembersContainer from './pages/members/membersContainer';
import ChaptersContainer from './pages/chapters/chapters';
import MapContainer from './pages/map/mapContainer';
import BlogPostsContainer from './pages/blogPosts/blogPostsContainer';
import ContactForm from './pages/contact/contactForm';

const routes = [{
  path: '/',
  component: PagesContainer, // serverside rendering will prefetch this in production
  exact: true,
}, {
  path: '/events',
  component: EventsContainer,
  prefetchResource: 'events',
}, {
  path: '/members',
  component: MembersContainer,
  prefetchResource: 'members',
}, {
  path: '/chapters',
  component: ChaptersContainer,
  prefetchResource: 'chapters',
}, {
  path: '/blog',
  component: BlogPostsContainer,
  prefetchResource: 'blogPosts',
}, {
  path: '/contact',
  component: ContactForm,
}, {
  path: '/map',
  component: MapContainer,
}, {
  path: '/:slug',
  component: PagesContainer,
}];

export default routes;
