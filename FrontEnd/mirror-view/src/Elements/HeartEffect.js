import $ from "jquery";
import "./HeartEffect.css";
import React, { useEffect } from "react";

const HeartEffect = () => {
  useEffect(() => {
    var lovepp = setInterval(function () {
      var r_num = Math.floor(Math.random() * 5) + 1;
      var r_size = Math.floor(Math.random() * 30) + 10;
      var r_left = Math.floor(Math.random() * 100) + 1;
      var r_bg = Math.floor(Math.random() * 25) + 100;
      var r_time = Math.floor(Math.random() * 5) + 60;

      $(".heartdiv").append(
        "<div class='heartpp' style='width:" +
          r_size +
          "px;height:" +
          r_size +
          "px;left:" +
          r_left +
          "%; background:rgba(255," +
          (r_bg - 25) +
          "," +
          r_bg +
          ",1);-webkit-animation:lovepp " +
          // r_time +
          // "s ease;-moz-animation:lovepp " +
          // r_time +
          // "s ease;-ms-animation:lovepp " +
          // r_time +
          // "s ease;animation:lovepp " +
          r_time +
          "s ease'></div>"
      );

      $(".heartdiv").append(
        "<div class='heartpp' style='width:" +
          (r_size - 10) +
          "px;height:" +
          (r_size - 10) +
          "px;left:" +
          (r_left + r_num) +
          "%;background:rgba(255," +
          (r_bg - 25) +
          "," +
          (r_bg + 25) +
          ",1);-webkit-animation:lovepp " +
          (r_time + 5) +
          "s ease;-moz-animation:lovepp " +
          // (r_time + 5) +
          // "s ease;-ms-animation:lovepp " +
          // (r_time + 5) +
          // "s ease;animation:lovepp " +
          (r_time + 5) +
          "s ease'></div>"
      );

      $(".heartpp").each(function () {
        var top = $(this)
          .css("top")
          .replace(/[^-\d.]/g, "");
        var width = $(this)
          .css("width")
          .replace(/[^-\d.]/g, "");
        if (top <= -100 || width >= 150) {
          $(this).detach();
        }
      });
    }, 2000);
  }, []);

  return <div className="heartdiv"></div>;
};

export default HeartEffect;
