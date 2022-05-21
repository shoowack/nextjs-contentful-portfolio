import {
  Firebase,
  Contentful,
  ContentfulAlt,
  Bootstrap,
  GraphQL,
  jQuery,
  NextJS,
  NextJSAlt,
  React,
  Sketch,
  Symfony,
  WordPress,
  WordPressAlt,
  PHP,
  Photoshop,
  MySQL,
  Illustrator
} from "./../lib/stackLogos";

const StackIcons = ({stack, contrast}) => {
  return stack.map(item => {
    const iconHeight = 30;
    const heightPercentage = percentage => (iconHeight * percentage) / 100;

    switch (item) {
      case "Bootstrap":
        return <img src={Bootstrap.src} height={heightPercentage(100)}/>;
      case "Contentful":
        return (<img src={contrast
            ? Contentful.src
            : ContentfulAlt.src} height={heightPercentage(100)}/>);
      case "Firebase":
        return <img src={Firebase.src} height={heightPercentage(100)}/>;
      case "GraphQL":
        return <img src={GraphQL.src} height={heightPercentage(100)}/>;
      case "Illustrator":
        return <img src={Illustrator.src} height={heightPercentage(100)}/>;
      case "jQuery":
        return <img src={jQuery.src} height={heightPercentage(70)}/>;
      case "MySQL":
        return <img src={MySQL.src} height={heightPercentage(50)}/>;
      case "NextJS":
        return (<img src={contrast
            ? NextJS.src
            : NextJSAlt.src} height={heightPercentage(100)}/>);
      case "Photoshop":
        return <img src={Photoshop.src} height={heightPercentage(100)}/>;
      case "PHP":
        return <img src={PHP.src} height={heightPercentage(90)}/>;
      case "React":
        return <img src={React.src} height={heightPercentage(90)}/>;
      case "Sketch":
        return <img src={Sketch.src} height={heightPercentage(100)}/>;
      case "Symfony":
        return <img src={Symfony.src} height={heightPercentage(100)}/>;
      case "WordPress":
        return (<img src={contrast
            ? WordPress.src
            : WordPressAlt.src} height={heightPercentage(100)}/>);
    }
  });
};

export default StackIcons;