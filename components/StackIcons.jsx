import { UncontrolledTooltip } from 'reactstrap';
import {
  ACF,
  Firebase,
  Formik,
  Contentful,
  ContentfulAlt,
  Bootstrap,
  GraphQL,
  jQuery,
  NextJS,
  NextJSAlt,
  React,
  Redux,
  Sketch,
  Symfony,
  SymfonyAlt,
  WordPress,
  WordPressAlt,
  PHP,
  Photoshop,
  MySQL,
  Illustrator,
  SASS,
  SASSAlt,
} from '../lib/stackLogos';

export default function StackIcons({ stack, contrast, section, isMobile }) {
  return stack.map((item) => {
    let src;
    let height;
    let tooltip;
    const iconHeight = 30;
    const heightPercentage = (percentage) => (iconHeight * percentage) / 100;
    const project = section.replace(/\./g, '-').replace(/ /g, '-').toLowerCase();
    const stackName = item.replace(/ /g, '-').toLowerCase();

    switch (item) {
      case 'ACF':
        src = ACF.src;
        tooltip = 'Advanced Custom Fields';
        break;
      case 'Bootstrap':
        src = Bootstrap.src;
        break;
      case 'Contentful':
        src = contrast ? Contentful.src : ContentfulAlt.src;
        break;
      case 'Firebase':
        src = Firebase.src;
        break;
      case 'GraphQL':
        src = GraphQL.src;
        break;
      case 'Illustrator':
        src = Illustrator.src;
        break;
      case 'jQuery':
        src = jQuery.src;
        height = heightPercentage(70);
        break;
      case 'MySQL':
        src = MySQL.src;
        height = heightPercentage(50);
        break;
      case 'NextJS':
        src = contrast ? NextJS.src : NextJSAlt.src;
        break;
      case 'Photoshop':
        src = Photoshop.src;
        break;
      case 'PHP':
        src = PHP.src;
        height = heightPercentage(90);
        break;
      case 'React':
        src = React.src;
        height = heightPercentage(90);
        break;
      case 'Sketch':
        src = Sketch.src;
        break;
      case 'Symfony':
        src = contrast ? Symfony.src : SymfonyAlt.src;
        break;
      case 'WordPress':
        src = contrast ? WordPress.src : WordPressAlt.src;
        break;
      case 'SASS':
        src = contrast ? SASS.src : SASSAlt.src;
        break;
      case 'Formik':
        src = Formik.src;
        break;
      case 'Redux':
        src = Redux.src;
        break;
      default:
        return;
    }

    // eslint-disable-next-line consistent-return
    return isMobile ? (
      <tr className="text-right">
        <td width="50%">
          <img src={src} height={height || heightPercentage(100)} alt={tooltip || item} />
        </td>
        <td width="50%">
          <p className="m-0 text-left">{item}</p>
        </td>
      </tr>
    ) : (
      <>
        <div
          id={`tooltip-${project}-${stackName}`}
          key={`${project}-${stackName}`}
          className="d-flex align-items-center"
        >
          <img src={src} height={height || heightPercentage(100)} alt={tooltip || item} />
        </div>
        <UncontrolledTooltip target={`tooltip-${project}-${stackName}`}>
          {tooltip || item}
        </UncontrolledTooltip>
      </>
    );
  });
}
