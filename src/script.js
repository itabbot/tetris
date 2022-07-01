window.TE = (function () {
  // 画布对象
  let _teCanvas = null;

  /**
   * 错误处理
   * @param {object} error 错误对象
   */
  const _handleError = function (error) {
    console.error(error);
    alert(error.message || "未知错误");
  };

  /**
   * “游戏失败事件”处理函数
   */
  const _handleGameOver = function () {
    // 显示蒙层
    document.getElementById("mask").style.visibility = "visible";
    // 显示游戏结束字样
    document.getElementById("game-over").style.visibility = "visible";
    // 显示重新开始按钮
    document.getElementById("restart").style.visibility = "visible";
    // 隐藏开始游戏按钮
    document.getElementById("start").style.visibility = "hidden";
  };

  /**
   * “游戏得分变化事件”处理函数
   */
  const _handleScoreChange = function (score) {
    document.getElementById("score").innerHTML = score;
  };

  /**
   * “已经消灭行数变化事件”处理函数
   */
  const _handleRowsChange = function (rows) {
    document.getElementById("rows").innerHTML = rows;
  };

  return {
    /**
     * 游戏初始化
     */
    init: function () {
      try {
        if (!TECanvas) throw new Error("加载画布工具失败");

        // 实例化画布对象
        _teCanvas = new TECanvas("game-canvas", "next-canvas", {
          // 基本配置
          rowNum: 20, // 设置游戏画布行数（纵向格子数量）
          colNum: 12, // 设置游戏画布列数（横向格子数量）
          // 设置事件处理函数
          gameOver: _handleGameOver, // 设置“游戏失败事件”处理函数
          scoreChange: _handleScoreChange, // 设置“游戏得分变化事件”处理函数
          rowsChange: _handleRowsChange, // 设置“已经消灭行数变化事件”处理函数
        });
      } catch (error) {
        _handleError(error);
      }
    },
    /**
     * 开始游戏
     */
    play: function () {
      try {
        _teCanvas.play();
      } catch (error) {
        _handleError(error);
      }
    },
  };
})();

// 页面加载成功后执行
window.onload = function () {
  TE.init();
};
