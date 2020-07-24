let btn = document.querySelector(".btn-search");
let input = document.querySelector("input[type='text']");
let box = document.querySelector(".overlay"),
  reg = /^[A-Za-z0-9]/;
Swal.fire({
  title: "Write Github username to get repo",
  icon: "info",
  showClass: {
    popup: "animate__animated animate__fadeInDown",
  },
  hideClass: {
    popup: "animate__animated animate__fadeOutUp",
  },
});
btn.addEventListener("click", () => {
  if (input.value == "" || !reg.test(input.value)) {
    Swal.fire({
      title: "enter user name",
      icon: "error",
      showClass: {
        popup: "animate__animated animate__fadeInDown",
      },
      hideClass: {
        popup: "animate__animated animate__fadeOutUp",
      },
    });
  } else {
    let dataBox = document.querySelector(".data-box"),
      close = document.querySelector(".close");
    box.classList.add("block");
    box.onclick = () => box.classList.remove("block");
    close.onclick = () => box.classList.remove("block");
    dataBox.onclick = (e) => e.stopPropagation();
    //get data from api
    fetch(`https://api.github.com/users/${input.value}/repos`)
      .then((response) => response.json())
      .then((data) => {
        dataBox.innerHTML = "";

        data.forEach((repo) => {
          //  mainDiv=document.querySelector(".main"),
          let repoContainer = document.createElement("div"),
            //create div to contain name of repo
            name = document.createElement("div"),
            // div contain url and stars
            info = document.createElement("div"),
            // crete a contain URL repo
            url = document.createElement("a"),
            // span contain stars repo
            stars = document.createElement("span"),
            // create text
            repoName = document.createTextNode(repo.name),
            urlText = document.createTextNode("Visit"),
            starsCount = document.createTextNode(
              `stars ${repo.stargazers_count}`
            );
          //add class
          name.className = "repo-name";
          info.className = "repo-info";
          url.className = "url";
          stars.className = "stars";
          repoContainer.className = "repo-container";

          //append
          name.appendChild(repoName);
          url.appendChild(urlText);
          url.href = `https://github.com/${input.value}/${repo.name}`;
          url.setAttribute("target", "_blank");
          stars.appendChild(starsCount);
          info.appendChild(url);
          info.appendChild(stars);
          repoContainer.appendChild(name);
          repoContainer.appendChild(info);
          dataBox.appendChild(repoContainer);
        });
      });
  }
});
