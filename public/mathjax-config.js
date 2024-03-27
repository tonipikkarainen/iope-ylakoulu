// mathjax-config.js

window.MathJax = {
  options: {
    ignoreHtmlClass: "tex2jax_ignore",
    processHtmlClass: "tex2jax_process",
  },
  tex: {
    packages: ["base", "ams", "noerrors", "noundefined", "mhchem"],
  },
  loader: {
    load: ["[tex]/noerrors", "[tex]/mhchem"],
  },
};

(function () {
  var script = document.createElement("script");
  script.src = "https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-svg.js";
  script.async = true;
  document.body.appendChild(script);
})();
