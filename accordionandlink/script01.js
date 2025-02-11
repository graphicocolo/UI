// その1
document.addEventListener("DOMContentLoaded", function () {
  // アコーディオンを開閉する関数
  function toggleAccordion(titleId, contentId) {
    let title = document.getElementById(titleId);
    let content = document.getElementById(contentId);

    title.addEventListener("click", function () {
      if (content.style.maxHeight && content.style.maxHeight !== "0px") {
        content.style.maxHeight = "0"; // 閉じる
        title.classList.remove("open"); // プラスに戻す
      } else {
        content.style.maxHeight = content.scrollHeight + "px"; // 開く
        title.classList.add("open"); // マイナスにする
      }
    });
  }

  // 初回ページ読み込み時に、URLのハッシュがある場合は開く
  function openAccordionFromHash() {
    const hash = window.location.hash;
    if (hash) {
      let targetId = hash.substring(1); // #pi-column01 → pi-column01
      let targetContent = document.getElementById(`pi-content${targetId.slice(-2)}`);
      let targetTitle = document.getElementById(`pi-title${targetId.slice(-2)}`);

      if (targetContent && targetTitle) {
        targetContent.style.maxHeight = targetContent.scrollHeight + "px"; // 開く
        targetTitle.classList.add("open"); // アイコンをマイナスにする
      }
    }
  }

  // 内部リンククリック時の動作（遷移 & アコーディオン開く）
  document.querySelectorAll(".internal-link").forEach(link => {
    link.addEventListener("click", function (event) {
      let targetId = this.getAttribute("href").substring(1); // #pi-column01 → pi-column01
      let targetContent = document.getElementById(`pi-content${targetId.slice(-2)}`);
      let targetTitle = document.getElementById(`pi-title${targetId.slice(-2)}`);

      if (targetContent.style.maxHeight === "0px" || !targetContent.style.maxHeight) {
        event.preventDefault(); // 通常のアンカー動作を防ぐ
        targetContent.style.maxHeight = targetContent.scrollHeight + "px"; // 開く
        targetTitle.classList.add("open"); // アイコンをマイナスにする

        // 遷移処理（少し遅延させる）
        setTimeout(() => {
          window.location.hash = targetId;
        }, 0);
      }
    });
  });

  // アコーディオン設定
  toggleAccordion("pi-title01", "pi-content01");
  toggleAccordion("pi-title02", "pi-content02");

  // 初回ロード時のハッシュ処理
  openAccordionFromHash();
});
