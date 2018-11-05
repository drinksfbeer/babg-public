import TextWithImage from './textWithImage/textWithImage';
import TextBlock from './textBlock/textBlock';
import HeroBanner from './heroBanner/heroBanner';
import CallOutWithImage from './callOutWithImage/callOutWithImage';
import NavBoxesRow from './navBoxesRow/navBoxesRow';
import AddHtml from './addHtml/addHtml';
import FullWidthImage from './fullWidthImage/fullWidthImage';
import PageHeader from './pageHeader/pageHeader';
import PullQuote from './pullQuote/pullQuote';
import RichText from './richText/richText';
import Video from './video/video';
import VideoBackground from './videoBackground/videoBackground';

export default {
  TextWithImageConfig: { // this name is important
    component: TextWithImage,
  },
  TextBlockConfig: { // this name is important
    component: TextBlock,
  },
  HeroBannerConfig: {
    component: HeroBanner,
  },
  CallOutWithImageConfig: {
    component: CallOutWithImage,
  },
  NavBoxesRowConfig: {
    component: NavBoxesRow,
  },
  AddHtmlConfig: {
    component: AddHtml,
  },
  FullWidthImageConfig: {
    component: FullWidthImage,
  },
  PageHeaderConfig: {
    component: PageHeader,
  },
  PullQuoteConfig: {
    component: PullQuote,
  },
  RichTextConfig: {
    component: RichText,
  },
  VideoConfig: {
    component: Video,
  },
  VideoBackgroundConfig: {
    component: VideoBackground,
  },
};

