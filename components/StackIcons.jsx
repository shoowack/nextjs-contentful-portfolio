import {UncontrolledTooltip} from "reactstrap";
import {useState} from "react";
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

const StackIcons = ({stack, contrast, section}) => stack.map(item => {
  let src;
  let height;
  const iconHeight = 30;
  const heightPercentage = percentage => (iconHeight * percentage) / 100;
  const project = section.replace(/\./g, "-").replace(/ /g, "-").toLowerCase();
  const stackName = item.replace(/ /g, "-").toLowerCase();

  switch (item) {
    case "Bootstrap":
      src = Bootstrap.src;
      break;
    case "Contentful":
      src = contrast
        ? Contentful.src
        : ContentfulAlt.src;
      break;
    case "Firebase":
      src = Firebase.src;
      break;
    case "GraphQL":
      src = GraphQL.src;
      break;
    case "Illustrator":
      src = Illustrator.src;
      break;
    case "jQuery":
      src = jQuery.src;
      height = heightPercentage(70);
      break;
    case "MySQL":
      src = MySQL.src;
      height = heightPercentage(50);
      break;
    case "NextJS":
      src = contrast
        ? NextJS.src
        : NextJSAlt.src;
      break;
    case "Photoshop":
      src = Photoshop.src;
      break;
    case "PHP":
      src = PHP.src;
      height = heightPercentage(90);
      break;
    case "React":
      src = React.src;
      height = heightPercentage(90);
      break;
    case "Sketch":
      src = Sketch.src;
      break;
    case "Symfony":
      src = Symfony.src;
      break;
    case "WordPress":
      src = contrast
        ? WordPress.src
        : WordPressAlt.src;
  }

  return (<div id={`tooltip-${project}-${stackName}`}>
    <img src={src} height={height
        ? height
        : heightPercentage(100)}/>
    <UncontrolledTooltip target={`tooltip-${project}-${stackName}`}>
      {item}
    </UncontrolledTooltip>
  </div>);
});

export default StackIcons;