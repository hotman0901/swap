import "./reset.css";
import "./puzzle.css";
import * as $ from "jquery";
import React, { useEffect } from "react";
import wait from "waait";

// 排序轉珠位置
// grid[0][0], grid[1][0], grid[2][0], grid[3][0], grid[4][0], grid[5][0]
// grid[0][1], grid[1][1], grid[2][1], grid[3][1], grid[4][1], grid[5][1]
// grid[0][2], grid[1][2], grid[2][2], grid[3][2], grid[4][2], grid[5][2]
// grid[0][3], grid[1][3], grid[2][3], grid[3][3], grid[4][3], grid[5][3]
// grid[0][4], grid[1][4], grid[2][4], grid[3][4], grid[4][4], grid[5][4]
// grid[0][5], grid[1][5], grid[2][5], grid[3][5], grid[4][5], grid[5][5]
// const container = null;
function App() {
  const grid_x_count = 6;
  const grid_y_count = 5;

  // 總共有幾種元素
  const numElements = 6;

  let iconSize, // icon 長寬比
    grid_width, // 棋盤寬度
    grid_height, // 棋盤高度
    active_icon, // 有按下的時候的物件
    playAreaOffset,
    lastCombo = 0,
    disableMove = false;

  let grid = []; // 存放全部轉珠顏色的陣列數字（有移動的話也要跟著更新 grid）

  useEffect(() => {
    // container = $(".container");
    initGrid();
    render();
    bindEvent();
    return () => {};
  }, []);

  // 建立轉隨機陣列
  function initGrid() {
    // 放置二維陣列 （屬性陣列用）
    for (let x = 0; x < grid_x_count; x++) {
      grid[x] = [];
      for (let y = 0; y < grid_y_count; y++) {
        // 隨機數字 1-6
        grid[x][y] = getRandomElement();
      }
    }
  }

  // 隨機數字
  function getRandomElement() {
    return Math.floor(Math.random() * numElements);
  }

  function render() {
    // 先算出畫面寬度可以放的珠珠大小
    // 畫面寬度除以要x幾顆
    let w = $("body").width() / grid_x_count;
    // 畫面高度除以要y幾顆
    let y = $("body").height() / grid_y_count;
    // 兩者取最小當作 iconSize
    iconSize = Math.floor(Math.min(w, y));

    // 算出轉珠區域
    // 轉換成實際寬高 px
    grid_width = iconSize * grid_x_count;
    grid_height = iconSize * grid_y_count;

    // 轉珠區域給上長寬
    $(".play-area").css({
      width: grid_width,
      height: grid_height,
      fontSize: iconSize,
    });

    // 取出轉珠框框距離瀏覽器 top、left 位置 用來絕對定位每一個珠珠用
    playAreaOffset = $(".play-area").offset();
    const { left, top } = playAreaOffset;
    // 將二維陣列的轉珠放上去
    for (let x = 0; x < grid_x_count; x++) {
      for (let y = 0; y < grid_y_count; y++) {
        // 建立轉珠 icon 用 div
        // data-x data-y 用來記住原本的座標位置
        const iconDiv = $(
          '<div class="block" data-x="' + x + '" data-y="' + y + '"></div>'
        );

        // 依序放位置
        iconDiv.css({
          left: x * iconSize + left, // 第幾個 icon 加上 離瀏覽器左邊位置
          top: y * iconSize + top,
          width: iconSize,
          height: iconSize,
        });

        // 用來給img
        iconDiv.addClass(`elem-${grid[x][y]}`);
        $(".play-area").append(iconDiv);
      }
    }

    var comboDiv = $(".combo");
    comboDiv
      .css({
        fontSize: iconSize * 0.6,
      })
      .hide();
  }

  // 綁定移動
  function bindEvent() {
    // 裝置偵測
    $("body").on("mousedown", ".block", onBlockDown); // mouse 按下的時候
    $("body").on("mousemove", onBlockMove); // mouse 拖拉的時候
    $("body").on("mouseup", onBlockUp);
    // touch 按下的時候
    $("body").on("touchstart", ".block", onBlockDown);
    $("body").on("touchmove", onBlockMove);
    $("body").on("touchend", onBlockUp);
    // pointer 按下的時候
    $("body").on("pointerdown", ".block", onBlockDown);
    $("body").on("pointermove", onBlockMove);
    $("body").on("pointerup", onBlockUp);
  }

  // 按下
  function onBlockDown(e) {
    // 是否可以移動
    // if (disableMove) {
    //   return;
    // }

    // 增加 css .active 主要是讓他 transition: none 這樣轉動動畫比較正常
    const block = $(e.currentTarget);
    block.addClass("active");
    // 將物件放到全域變數
    active_icon = block;
  }

  // 移動
  function onBlockMove(e) {
    e.preventDefault();
    // 如果沒有按下給予的物件就不給移動
    if (!active_icon) {
      return;
    }

    // 目前滑鼠移動
    let cursor_x = e.pageX;
    let cursor_y = e.pageY;

    // 取不到值應該是移動端
    if (!cursor_x && !cursor_y) {
      if (e.originalEvent.touches) {
        // touch
        cursor_x = e.originalEvent.touches[0].pageX;
        cursor_y = e.originalEvent.touches[0].pageY;
      } else {
        // pointer
        cursor_x = e.originalEvent.pageX;
        cursor_y = e.originalEvent.pageY;
      }
    }

    // 會遇到圖片位置跑走必須偏移他
    const pointer_x = cursor_x - iconSize / 2;
    const pointer_y = cursor_y - iconSize / 2;

    // 利用目前滑鼠位置取出經過該元素的二維陣列 index
    const passiveLocation = getGridLocation(cursor_x, cursor_y);

    swapLocation(
      active_icon.attr("data-x"),
      active_icon.attr("data-y"),
      passiveLocation.x,
      passiveLocation.y
    );

    active_icon.css({
      left: pointer_x,
      top: pointer_y,
    });
  }

  function onBlockUp(e) {
    if (!active_icon) {
      // 這裡會有一個 bug，下面 null 掉 jquery 會失效 時間差造成
      return;
    }

    const { left, top } = playAreaOffset;
    // 固定回位置
    active_icon.removeClass("active").css({
      left: active_icon.attr("data-x") * iconSize + left,
      top: active_icon.attr("data-y") * iconSize + top,
    });
    // 清除
    active_icon = null;

    // combo 歸零
    lastCombo = 0;

    // 不可移動
    disableMove = true;

    // 判斷三顆以上需要消除
    checkBlocks();
  }

  function checkBlocks() {
    let clear = [];
    // 計算有無 clear 的轉珠
    let countClear = 0;
    for (let x = 0; x < grid_x_count; x++) {
      clear[x] = [];
    }

    // 依序遍歷
    for (let x = 0; x < grid_x_count; x++) {
      for (let y = 0; y < grid_y_count; y++) {
        // grid[[], [], [], [], []]
        // 0: (5) [2, 1, 4, 1, 4]
        // 1: (5) [3, 4, 0, 3, 1]
        // 2: (5) [4, 4, 3, 5, 4]
        // 3: (5) [2, 3, 5, 1, 1]
        // 4: (5) [2, 2, 1, 1, 0]
        // 5: (5) [4, 3, 2, 4, 4]

        // 實際第一排為 5 * 6
        // grid[0][0], grid[1][0], grid[2][0], grid[3][0], grid[4][0], grid[5][0]
        // grid[0][1], grid[1][1], grid[2][1], grid[3][1], grid[4][1], grid[5][1]
        // grid[0][2], grid[1][2], grid[2][2], grid[3][2], grid[4][2], grid[5][2]
        // grid[0][3], grid[1][3], grid[2][3], grid[3][3], grid[4][3], grid[5][3]
        // grid[0][4], grid[1][4], grid[2][4], grid[3][4], grid[4][4], grid[5][4]

        // 因為3顆就要消除
        //
        // 消除是直條，所以我們要遍歷  5 - 2 = 3 次
        // (grid[0][0], grid[0][1], grid[0][2]) -> (grid[0][1], grid[0][2], grid[0][3]) -> (grid[0][2], grid[0][3], grid[0][4])
        // 所以是要這樣判斷
        if (
          y < grid_y_count - 2 &&
          grid[x][y] === grid[x][y + 1] &&
          grid[x][y] === grid[x][y + 2]
        ) {
          countClear++;
          // 記錄要消除的 array index
          clear[x][y] = grid[x][y] + " blank";
          clear[x][y + 1] = grid[x][y] + " blank";
          clear[x][y + 2] = grid[x][y] + " blank";
          // 給要消除的轉珠加上 css
          $("[data-x=" + x + "][data-y=" + y + "]").addClass("blank");
          $("[data-x=" + x + "][data-y=" + (y + 1) + "]").addClass("blank");
          $("[data-x=" + x + "][data-y=" + (y + 2) + "]").addClass("blank");
        }

        // x 軸同 y 軸判斷

        // 實際第一排為 5 * 6
        // grid[0][0], grid[1][0], grid[2][0], grid[3][0], grid[4][0], grid[5][0]
        // grid[0][1], grid[1][1], grid[2][1], grid[3][1], grid[4][1], grid[5][1]
        // grid[0][2], grid[1][2], grid[2][2], grid[3][2], grid[4][2], grid[5][2]
        // grid[0][3], grid[1][3], grid[2][3], grid[3][3], grid[4][3], grid[5][3]
        // grid[0][4], grid[1][4], grid[2][4], grid[3][4], grid[4][4], grid[5][4]
        // x 軸相同
        if (
          x < grid_x_count - 2 &&
          grid[x][y] === grid[x + 1][y] &&
          grid[x][y] === grid[x + 2][y]
        ) {
          countClear++;
          // 記錄要消除的 array index
          clear[x][y] = grid[x][y] + " blank";
          clear[x + 1][y] = grid[x][y] + " blank";
          clear[x + 2][y] = grid[x][y] + " blank";
          // 給要消除的轉珠加上 css blank
          $("[data-x=" + x + "][data-y=" + y + "]").addClass("blank");
          $("[data-x=" + (x + 1) + "][data-y=" + y + "]").addClass("blank");
          $("[data-x=" + (x + 2) + "][data-y=" + y + "]").addClass("blank");
        }

        // 代表沒有消除的地方才會 clear 會取不到值
        if (!clear[x][y]) {
          clear[x][y] = grid[x][y];
        }
      }
    }

    grid = clear;

    // 代表有要消除的連線
    // if (countClear > 0) {
    //   clearSection(false);
    // } else {
    //   // 隱影 combo
    //   $(".combo").hide();
    //   // 才可以執行 move
    //   disableMove = false;
    // }
  }

  // 清除元素
  async function clearSection(delay) {
    if (delay) {
      // 連續
      lastCombo++;
      // 連續超過兩次 就顯示 combo
      if (lastCombo > 2) {
        $(".combo")
          .text("Combo " + lastCombo + "!")
          .show();
      }
      await wait(320);
      // 移除屬性
      $(".block.flash").attr("class", "block");
    }

    await wait((delay = delay ? 100 : 0));

    const exist = $(".block.blank").length > 0;
    if (exist) {
      // 需要利用演算法
      // 類似使用algorithms-number-of-islands作法
      // https://javascript.plainenglish.io/javascript-algorithms-number-of-islands-leetcode-6eff200bdf1
      // 因為使用 algorithms-number-of-islands 必須知道我要消除的是什麼顏色的，所以我們取出 .block.blank 第一個元素重複去找
      const block = $($(".block.blank")[0]);

      // 取得 x-y 座標 然後再從  grid 取得是什麼顏色
      const x = parseInt(block.attr("data-x"));
      const y = parseInt(block.attr("data-y"));
      findSection(x, y, grid[x][y], true);
    } else {
      // 如果沒有了
      dropBlock();
    }
  }

  // 將目前畫面的空白的慢慢 swap 位置
  async function dropBlock() {
    var dropped = false;
    // step1. 先把有移除掉的空白往下填滿
    for (let x = 0; x < grid_x_count; x++) {
      // grid[0][0], grid[1][0], grid[2][0], grid[3][0], grid[4][0], grid[5][0]
      // grid[0][1], grid[1][1], grid[2][1], grid[3][1], grid[4][1], grid[5][1]
      // grid[0][2], grid[1][2], grid[2][2], grid[3][2], grid[4][2], grid[5][2]
      // grid[0][3], grid[1][3], grid[2][3], grid[3][3], grid[4][3], grid[5][3]
      // grid[0][4], grid[1][4], grid[2][4], grid[3][4], grid[4][4], grid[5][4]
      // 要從最下面開始換才會有下墜感
      for (let y = grid_y_count; y >= 0; y--) {
        //  從底部開始
        if (grid[x][y] === "blank" && y > 0 && grid[x][y - 1] !== "blank") {
          // 上下調換
          swapLocation(x, y, x, y - 1);
          dropped = true;
        }
      }
    }
    if (dropped) {
      // 往下降一格後需要 重新 loop 看還有沒有空白
      await wait(20);
      dropBlock();
    } else {
      // 空白已經都留在最上面，這時候需要將空白亂數填入
      await wait(20);
      fillBlock();
    }
  }

  // 隨機填入
  async function fillBlock() {
    // 先從最上面補，人然後再往下
    // grid[0][0], grid[1][0], grid[2][0], grid[3][0], grid[4][0], grid[5][0]
    // grid[0][1], grid[1][1], grid[2][1], grid[3][1], grid[4][1], grid[5][1]
    // grid[0][2], grid[1][2], grid[2][2], grid[3][2], grid[4][2], grid[5][2]
    // grid[0][3], grid[1][3], grid[2][3], grid[3][3], grid[4][3], grid[5][3]
    // grid[0][4], grid[1][4], grid[2][4], grid[3][4], grid[4][4], grid[5][4]
    let fill = false;
    // 先看有無空白的
    for (let x = 0; x < grid_x_count; x++) {
      const isBlank = grid[x][0] === "blank";
      if (isBlank) {
        // 隨機字
        const random = getRandomElement();
        grid[x][0] = random;
        // 將 icon 塞入
        // 將 icon 先從最上面 超出地方進來
        $("[data-x=" + x + "][data-y=0]")
          .css("top", -iconSize + playAreaOffset.top)
          .addClass("elem-" + random);
        fill = true;
      }
    }

    // 如果有 blank 再重新執行 dropBlock
    if (fill) {
      await wait(80);
      $("[data-y=0]").css("top", playAreaOffset.top);
      // 再重新執行 因為我們是從最上面開始補
      dropBlock();
    } else {
      // 空白補充完畢後重新執行，因為有可能新的下來會有3個一樣的
      checkBlocks();
    }
  }

  // 搜尋同顏色鄰兵加上屬性
  // gridItem = 數字 + blank
  function findSection(x, y, gridItem, next) {
    // 有問題的
    if (
      x < 0 ||
      x >= grid_x_count ||
      y < 0 ||
      y >= grid_y_count ||
      grid[x][y] !== gridItem
    ) {
      return;
    }

    // selector 該物件位置的 div
    const elem = $("[data-x=" + x + "][data-y=" + y + "]");

    // 如果該物件有我們剛剛加的 blank 屬性，就需要找自己臨兵位置
    if (elem.hasClass("blank")) {
      grid[x][y] = "blank"; // 原本是 數字 + blank
      elem.removeClass("blank").addClass("flash"); // 移除掉且增加閃爍屬性
      // 找自己臨兵位置，再重複 call 一次
      findSection(x, y + 1, gridItem); // 上
      findSection(x, y - 1, gridItem); // 下
      findSection(x - 1, y, gridItem); // 左
      findSection(x + 1, y, gridItem); // 右
    }

    // 繼續接著找還有無可以消除的3個以上的
    if (next) {
      clearSection(true);
    }
  }

  // 交換位置
  // 目前元素的位置與經過的元素位置交換
  function swapLocation(activeX, activeY, passiveX, passiveY) {
    // 位置都依樣就不需要
    if (activeX === passiveX && activeY === passiveY) {
      return;
    }

    // 元素
    // 0: 藍色
    // 1: 紅色
    // 2: 綠色
    // 3: 金色
    // 4: 紫色
    // 5: 粉色

    // 原本的顏色
    const tmp = grid[activeX][activeY];
    // 交換位置
    // 原本位置塞入新的位置
    grid[activeX][activeY] = grid[passiveX][passiveY];
    // 新的位置塞入移動原本的位置
    grid[passiveX][passiveY] = tmp;

    // 交換 data-x data-y
    var active = $("[data-x=" + activeX + "][data-y=" + activeY + "]");
    var passive = $("[data-x=" + passiveX + "][data-y=" + passiveY + "]");

    active.attr("data-x", passiveX).attr("data-y", passiveY);
    passive.attr("data-x", activeX).attr("data-y", activeY);

    // 被換移到舊的
    passive.css({
      left: activeX * iconSize + playAreaOffset.left,
      top: activeY * iconSize + playAreaOffset.top,
    });

    // if(grid[passiveX][passiveY] == 'blank') {
    // 會有殘影
    active.css({
      left: passiveX * iconSize + playAreaOffset.left,
      top: passiveY * iconSize + playAreaOffset.top,
    });
    // }
  }

  // 參數給 xy 座標，計算出在第幾行第幾列
  function getGridLocation(px_x, px_y) {
    const { left, top } = playAreaOffset;
    let x = px_x - left;
    let y = px_y - top;

    // 先用 px 位置 轉成第幾個
    x = Math.floor(x / iconSize);
    y = Math.floor(y / iconSize);

    if (x >= grid_x_count) {
      x = grid_x_count - 1;
    }

    if (x < 0) {
      x = 0;
    }

    if (y >= grid_y_count) {
      y = grid_y_count - 1;
    }

    if (y < 0) {
      y = 0;
    }

    return { x, y };
  }

  return (
    <div className="app">
      <div className="container">
        {/* 預留 */}
        {/* <div className="display-area" /> */}
        {/* 轉珠 */}
        <div className="play-area" />
        <div className="combo" />
      </div>
    </div>
  );
}

export default App;
