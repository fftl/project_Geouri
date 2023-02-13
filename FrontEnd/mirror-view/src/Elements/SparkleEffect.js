import $ from "jquery";
import "./SparkleEffect.css";

const SparkleEffect = () => {
  $(function () {
    var body = $("#starshine"),
      template = $(".shine"),
      stars = 500,
      sparkle = 20;

    var size = "small";
    var createStar = function () {
      template
        .clone()
        .removeAttr("id")
        .css({
          top: Math.random() * 100 + "%",
          left: Math.random() * 100 + "%",
          webkitAnimationDelay: Math.random() * sparkle + "s",
          mozAnimationDelay: Math.random() * sparkle + "s",
        })
        .addClass(size)
        .appendTo(body);
    };

    for (var i = 0; i < stars; i++) {
      if (i % 2 === 0) {
        size = "small";
      } else if (i % 3 === 0) {
        size = "medium";
      } else {
        size = "large";
      }

      createStar();
    }
  });

  return (
    <div id="starshine">
      <div className="shine"></div>
    </div>
  );
};

export default SparkleEffect;
