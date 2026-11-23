window.tuataraManualText = {"01-what-facematch-is":" what facematch is a package that ranks candidate photos by how probable it is that they show the person of one or more master photos. you choose the photos in rimu, tuatara's directory list, with its preview showing each one. you mark the master photos, which show the person you look for, and the candidates, which may or may not. facematch compares them and lists the candidates with the most probable first. each has its probability and the words the office of the director of national intelligence (odni) uses for it, such as \"almost certain\" or \"unlikely\". it is a package, not part of the editor, and it does no face recognition itself. the comparison is done by the facematch engine, a project of its own at github.com/yardquit/facematch. the engine is insightface with the auraface-v1 model and the yunet face detector, made into one appimage. the package starts it in the background, shut in tuatara's sandbox (chapter 4).","01-what-facematch-is#loading-it-and-the-engine":"1.1 loading it and the engine the package never downloads the engine. what runs is the file that *facematch-program* names, which you fetched and checked yourself. the package's readme gives the steps to fetch the engine, check it and load the package. this manual starts after that. to see whether the engine is found, run m-x check-health . it lists \"faces ranked by probability\" with the engine's path, or says how to get the engine.","01-what-facematch-is#what-the-engine-needs":"1.2 what the engine needs the engine's own readme says how to build it instead of downloading it. on arch and omarchy, an appimage needs fuse 2 to run, from the package fuse2 .","01-what-facematch-is#what-this-manual-covers":"1.3 what this manual covers chapter 2 is the use: marking photos, comparing, and reading the ranked list. chapter 3 says what a probability means here and where it should not be trusted. chapter 4 says how the engine is kept from the photos and from the rest of your files, and lists the settings. chapter 5 lists every command and setting.","02-comparing-photos":" comparing photos mark the photos in rimu, compare them, and read the ranking. photos are chosen in rimu, so everything here happens in a rimu list. open one with c-x d . the preview shows the photo under the cursor.","02-comparing-photos#marking-the-masters-and-the-candidates":"2.1 marking the masters and the candidates open the directory with the master photos in rimu. the master photos show the person you look for. press c-c f m on a photo to mark it as a master. this is tuatara's own command, rimu-mark-master . an m appears in the first column. mark one photo, or several of the same person. several are averaged into one template. press u to take a mark away. open the directory of the candidates. it may be another directory. press m on each candidate, as for any rimu operation. a candidate has > in the first column. masters can be marked in any rimu list, because they are often kept in a directory of their own. candidates are the photos marked in the directory the list shows. marks kept in other directories are not taken.","02-comparing-photos#the-ranked-list":"2.2 the ranked list c-c f f ( facematch-compare ) compares every master photo marked, in any rimu list, with the candidates marked in this directory. the engine runs in the background, so you can go on working. when it has finished, a rimu list named *facematch* opens. with c-u c-c f f , the command first asks for a detection confidence for this run, which starts at 0.8, the strict one. without it, the setting *facematch-detection-confidence* is used (chapter 4). the list shows the masters first. a line apart come the candidates, the most probable first, each with its ranking beside its name. moving through the list, the preview shows each photo. marks and rimu's other keys work as in any list. ~/pictures/: 3 candidates ranked against 2 master photos (the least alike two 0.6123 alike, 99.0% one person): auraface-v1 ... master masters/aroha-rotorua-1.jpg master masters/aroha-rotorua-2.jpg 99.0% almost certain similarity 0.5312 photos/p17.jpg 62.4% likely similarity 0.2474 likeliest of 3 faces photos/p03.jpg 1.2% almost no chance similarity 0.0081 photos/p11.jpg not compared: no face found photos/p20.jpg the line over the list says how many candidates were ranked against how many master photos, which model and detector found and compared the faces, and what the probabilities were calibrated on. with several masters it also says how alike the two least alike masters are, and how probable it is that they show one person. when that is under 50%, the line adds that the masters may not all be the same person. each candidate's line gives: the probability that it shows the master's person, in per cent. it is shown in the theme's info face from 80%, its warning face from 45% and its error face below that; the odni's words for that probability, from the table below; the similarity behind the probability, a number from the engine; likeliest of n faces when the photo has more than one face. the face of the candidate that is likeliest is the one ranked; a photo's name last. a photo that could not be compared, for instance because no face was found in it, is listed after the others, with not compared and the engine's reason. modal non-modal command what it does none c-c f f facematch-compare rank the candidate photos marked (m) in the directory this rimu list shows by how probable it is that each shows the person of the master photos marked (c-c f m, m, in any list), in a rimu list of their own, facematch .","02-comparing-photos#the-words":"2.3 the words the words follow the odni's scale of estimative probability, from its intelligence community directive (icd) 203. words probability almost certain 95-99% very likely 80-95% likely 55-80% even chance 45-55% unlikely 20-45% very unlikely 5-20% almost no chance 1-5%","02-comparing-photos#ranking-in-the-list-you-are-in":"2.4 ranking in the list you are in c-c f r ( facematch-rank-here ) compares the same way, but shows the ranking in the rimu list you are in. beside each photo's name come its probability, words and similarity, with the preview on the right: 99.0% almost certain similarity 0.4447 p17.jpg the lines of the files that were not compared are taken out, as k takes lines out. the files themselves are not touched. the candidates' marks are taken away, and the masters' m is kept. press c-c f r again to show the list as it was. the ranked list *facematch* belongs to c-c f f alone. a new comparison closes an earlier *facematch* first, so that its ranking is never shown beside photos of another comparison. modal non-modal command what it does none c-c f r facematch-rank-here rank the candidates as m-x facematch-compare does, and show the ranking in this rimu list, beside the photos' names, the lines of the files not compared taken out, as k takes them, the candidates' marks taken away (c-c f f shows the ranking in a list of its own).","02-comparing-photos#when-nothing-happens":"2.5 when nothing happens the commands say why they did not start: not in a rimu list: candidates are marked in a rimu list and compared from it; no master photo is marked: c-c f m marks one; no candidate is marked in this directory: m marks one; the engine is not found: the message says how to get it. when the engine ran but compared nothing, the message gives its reasons, one per photo. only files are taken. a directory marked as a master or a candidate is left out.","03-what-the-probability-means":" what the probability means how the engine makes a probability, how well it held, and where it should not be trusted. a similarity between two faces is not a probability. the engine turns it into one with a curve fitted on labeled faces in the wild (lfw): 6000 pairs of photos known to be of one person or of two. the curve was checked on folds of pairs it had never seen. the fitting and its data are in the engine's project ( calibrate.py and calibration.json ).","03-what-the-probability-means#how-it-held-on-lfw":"3.1 how it held on lfw these are scored on folds the curve never saw. measure result pairs right at 50% 98.8% (+-0.3% between folds) brier score 0.010 pairs said 0-5% likely: one person 0.9% said 5-20%: one person 8.7% said 20-45%: one person 21.6% said 80-95%: one person 94.7% said 95% and over: one person 100% auraface's makers report 99.65% on lfw with their own face detector. this engine finds faces with yunet, whose license is settled, and measures 98.8%. probabilities are shown from 1% to 99%, the ends of the odni's scale. no calibration on 6000 pairs supports more certainty than that. in a photo of several people, a master's face is the largest one. a candidate's face is whichever of its faces is likeliest.","03-what-the-probability-means#where-it-should-not-be-trusted":"3.2 where it should not be trusted even prior odds. lfw's pairs are half the same person, so the probability says how far the faces move the odds from 50%. if you have reason to think a match is rare, such as one suspect among thousands of photos, the real probability is lower than shown. news photos. lfw is mostly frontal, well-lit news photography. profile views, poor light, low resolution and age gaps lower accuracy, and the calibration says nothing about how much. several masters. the curve was fitted on one photo against one. a template of several masters raises genuine scores by design, so the probabilities for a template are somewhat generous. ethnicity. auraface's makers say its training data may not cover all ethnicities well. treat the ranking as a way to find which photos to examine, not as an identification.","04-safety-and-settings":" safety and settings how the engine is kept from your files, and the settings that change a run. the photos may be evidence, and a picture can be made to harm the program that reads it. so the engine runs shut in tuatara's sandbox: it sees private copies of the photos under names of its own, such as master-1.jpg and candidate-2.png . it never sees the photos' directories or names; its appimage is unpacked once, outside the sandbox because it is your own program, into tuatara's cache. it is run from there read only, so no run can change it for the next one; it has no network, and nothing of yours but its own files; it runs in the background, with at most 16 gib of memory, and is stopped after *facematch-seconds* . the copies are deleted when the engine is done. the photos are only read.","04-safety-and-settings#the-settings":"4.1 the settings set them in the package's :config in your init file: (load-package \"facematch\" :source \"https://github.com/tuatara-editor/tuatara-facematch\" :config (setf *facematch-seconds* \"30m\")) setting default values what it changes *facematch-program* \"facematch\" text the facematch engine to run. *facematch-detection-confidence* nil nil, or a number from 0 to 1 how sure the face detector must be for a face to count. *facematch-seconds* 900 a whole number of seconds, 1 or more, or a time in words such as 500ms, 90s, 30m or 2h, at most a hundred years the most seconds one comparison may take before the engine is stopped. a value of *facematch-detection-confidence* outside the range stops the comparison with an error. c-u c-c f f sets one run's value without changing the setting.","05-every-command-and-setting":" every command and setting each command and setting of facematch, to look one up by name. the tables are made from the program each time this manual is made, so they never list a command or setting that facematch does not have. the first table has four columns. the first two are keys: the modal keys, which work only with modal editing on, and the non-modal keys, which work with it off too. a command with no key says m-x and its name in the second column, because you can only run it by its name. the third column is the name of the command and the fourth says what it does. to run a command by its name, press m-x , type a few letters of the name and press ret . to find a command from within the editor, press c-h f . to find the command that a key runs, press c-h k and then the key. the editor's own settings and commands are in chapters 21 and 22 of its manual.","05-every-command-and-setting#every-command":"5.1 every command modal non-modal command what it does none c-c f f facematch-compare rank the candidate photos marked (m) in the directory this rimu list shows by how probable it is that each shows the person of the master photos marked (c-c f m, m, in any list), in a rimu list of their own, facematch . none c-c f r facematch-rank-here rank the candidates as m-x facematch-compare does, and show the ranking in this rimu list, beside the photos' names, the lines of the files not compared taken out, as k takes them, the candidates' marks taken away (c-c f f shows the ranking in a list of its own).","05-every-command-and-setting#every-setting":"5.2 every setting setting default values what it changes *facematch-detection-confidence* nil nil, or a number from 0 to 1 how sure the face detector must be for a face to count. *facematch-program* \"facematch\" text the facematch engine to run. *facematch-seconds* 900 a whole number of seconds, 1 or more, or a time in words such as 500ms, 90s, 30m or 2h, at most a hundred years the most seconds one comparison may take before the engine is stopped."};
// The manual's pages: filter the contents column to the headings whose title or
// text holds what is typed in its box, and change between light and dark
// colours (the choice kept in this browser for the next page). The entry for
// the part being read is marked as the page scrolls. The text of
// every section comes before this script, in window.tuataraManualText, made
// when the manual is built. Links are left alone. No address is ever loaded.
(function () {
  var root = document.documentElement;
  var key = "tuatara-manual-theme";
  var saved = null;
  try { saved = window.localStorage.getItem(key); } catch (e) { saved = null; }
  if (saved === "light" || saved === "dark") { root.setAttribute("data-theme", saved); }

  function dark() {
    var chosen = root.getAttribute("data-theme");
    if (chosen) { return chosen === "dark"; }
    return Boolean(window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches);
  }

  var button = document.querySelector("button.theme");
  if (button) {
    var label = function () {
      button.textContent = dark() ? "Light" : "Dark";
      button.setAttribute("aria-label", dark() ? "Use light colours" : "Use dark colours");
    };
    button.hidden = false;
    label();
    button.addEventListener("click", function () {
      var next = dark() ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try { window.localStorage.setItem(key, next); } catch (e) { /* kept for this page only */ }
      label();
    });
  }

  var nav = document.querySelector("nav.toc");
  var box = nav && nav.querySelector("input");
  if (!box) { return; }
  var texts = window.tuataraManualText || {};

  // The key of a section in the text: a chapter's page name without its
  // ending, then # and the heading's id. On the page of every chapter the
  // links are "10-directories.html#marks", on the whole manual "#10-directories--marks".
  function keyOf(href) {
    var parts = /^#?([0-9]+-[^#.]*?)(?:\.html)?(?:(?:#|--)(.*))?$/.exec(href || "");
    if (!parts) { return null; }
    return parts[2] ? parts[1] + "#" + parts[2] : parts[1];
  }

  // Show ITEM when its title or text holds WORDS, or any entry under it does.
  function show(item, words) {
    var link = item.querySelector(":scope > a");
    var title = link ? link.textContent.toLowerCase() : "";
    var text = (link && texts[keyOf(link.getAttribute("href"))]) || "";
    var hit = words === "" || title.indexOf(words) !== -1 || text.indexOf(words) !== -1;
    item.querySelectorAll(":scope > ol > li").forEach(function (inner) {
      if (show(inner, words)) { hit = true; }
    });
    item.classList.toggle("hidden", !hit);
    return hit;
  }

  box.addEventListener("input", function () {
    var words = box.value.trim().toLowerCase().replace(/\s+/g, " ");
    nav.classList.toggle("filtering", words !== "");
    nav.querySelectorAll("ol.chapters > li").forEach(function (item) { show(item, words); });
  });

  // The entry of the column for the part being read is marked, following as
  // the page is scrolled: the last heading that has reached the middle of
  // the window, and the entries it is under, so a section folded out of sight
  // leaves the section holding it marked. On the whole manual, where no chapter is marked as the one
  // shown, its chapter is unfolded too.
  var whole = !nav.querySelector("li.here");
  var here = location.pathname;
  var marks = [];
  nav.querySelectorAll("ol.chapters a").forEach(function (link) {
    var url = new URL(link.href, location.href);
    if (url.pathname !== here) { return; }
    var target = url.hash ? document.getElementById(decodeURIComponent(url.hash.slice(1)))
                          : document.querySelector("main h1");
    if (target) { marks.push({ link: link, target: target, top: 0 }); }
  });
  if (marks.length === 0) { return; }
  var marked = null;

  function measure() {
    marks.forEach(function (mark) { mark.top = mark.target.getBoundingClientRect().top + window.scrollY; });
    marks.sort(function (a, b) { return a.top - b.top; });
  }

  // Mark or unmark the entry of MARK and every entry it is under.
  function light(mark, on) {
    for (var item = mark.link.closest("li"); item && nav.contains(item); item = item.parentElement.closest("li")) {
      item.querySelector(":scope > a").classList.toggle("in-view", on);
    }
  }

  // Keep LINK in view in whichever part of the column scrolls.
  function reveal(link) {
    [nav, nav.querySelector("ol.chapters")].forEach(function (box) {
      if (!box || box.scrollHeight <= box.clientHeight) { return; }
      var outer = box.getBoundingClientRect();
      var inner = link.getBoundingClientRect();
      if (inner.top < outer.top) { box.scrollTop -= outer.top - inner.top + 24; }
      else if (inner.bottom > outer.bottom) { box.scrollTop += inner.bottom - outer.bottom + 24; }
    });
  }

  // Mark the entry of the last heading at or above the middle of the
  // window, the first when none is: a search in the measured places, the
  // page changed only when the entry is another.
  function follow() {
    var line = window.scrollY + window.innerHeight / 2;
    var low = 0, high = marks.length - 1, found = marks[0];
    while (low <= high) {
      var middle = (low + high) >> 1;
      if (marks[middle].top <= line) { found = marks[middle]; low = middle + 1; } else { high = middle - 1; }
    }
    if (found === marked) { return; }
    if (marked) { light(marked, false); }
    marked = found;
    light(marked, true);
    if (whole) {
      var chapter = marked.link.closest("ol.chapters > li");
      nav.querySelectorAll("ol.chapters > li.here").forEach(function (item) {
        if (item !== chapter) { item.classList.remove("here"); }
      });
      if (chapter) { chapter.classList.add("here"); }
    }
    reveal(marked.link);
  }

  // Measure again when pictures have loaded or the window changed size.
  function again() {
    measure();
    if (marked) { light(marked, false); }
    marked = null;
    follow();
  }

  measure();
  follow();
  window.addEventListener("scroll", follow, { passive: true });
  window.addEventListener("resize", again);
  window.addEventListener("load", again);
}());
