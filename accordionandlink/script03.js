// その3
document.addEventListener("DOMContentLoaded", () => {
  // アコーディオンを開く（外部・内部リンク遷移用）
  const openAccordion = (titleId, contentId) => {
    let content = document.getElementById(contentId);
    let title = document.getElementById(titleId);
    content.style.maxHeight = content.scrollHeight + "px"; // 開く
    title.classList.add("open"); // アイコンをマイナスにする
  };

  // アコーディオンの開閉処理
  const toggleAccordion = (titleId, contentId) => {
    document.getElementById(titleId).addEventListener("click", () => {
      let content = document.getElementById(contentId);
      let title = document.getElementById(titleId);

      if (content.style.maxHeight && content.style.maxHeight !== "0px") {
        content.style.maxHeight = "0"; // 閉じる
        title.classList.remove("open"); // アイコンをプラスに戻す
      } else {
        openAccordion(titleId, contentId);
      }
    });
  };

  // URLのハッシュを取得し、該当する要素をアニメーション付きで開く
  const hash = window.location.hash;
  if (hash === "#pi-column01") {
    openAccordion("pi-title01", "pi-content01");
  } else if (hash === "#pi-column02") {
    openAccordion("pi-title02", "pi-content02");
  }

  toggleAccordion("pi-title01", "pi-content01");
  toggleAccordion("pi-title02", "pi-content02");

  // 内部リンククリック時の動作
  document.querySelectorAll(".internal-link").forEach((link) => {
    link.addEventListener("click", (e) => {
      let targetId = this.getAttribute("href").substring(1); // "#pi-column01" → "pi-column01"
      let targetContent = document.getElementById(`pi-content${targetId.slice(-2)}`);
      let targetTitle = document.getElementById(`pi-title${targetId.slice(-2)}`);

      if (targetContent.style.maxHeight === "0px" || !targetContent.style.maxHeight) {
        e.preventDefault(); // 通常のアンカー動作を防ぐ
        openAccordion(targetTitle.id, targetContent.id);
        setTimeout(() => {
          window.location.hash = targetId; // 遷移
        }, 0);
      }
    });
  });
});
