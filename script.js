// Hide video intro after it finishes
document.addEventListener("DOMContentLoaded", () => {
  const introVideo = document.getElementById("introVideo");

  introVideo.onended = () => {
      document.querySelector(".video-intro").classList.add("hidden");
  };
});
