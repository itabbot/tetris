/**
 * 游戏画布类
 * @param {string} gId 游戏画布ID
 * @param {string} nId 下一个方块画布ID
 * @param {object} configs 配置项
 */
function TECanvas(gId, nId, configs = {}) {
  let _gId = ""; // 游戏画布ID
  let _nId = ""; // 下一个方块画布ID
  let _gElement = null; // 游戏画布元素
  let _nElement = null; // 下一个方块画布元素
  let _gContext = null; // 游戏画布上下文
  let _nContext = null; // 下一个方块画布上下文
  let _isPlaying = false; // 游戏是否正在进行中

  // 方块模板，定义了各类方块的颜色形状等
  const _pieceTemplate = {
    I: {
      // 向上方向
      up: {
        // 方块的颜色
        color: "#fa1e1e",
        // 方块的形状
        // 及其位置（基于左上角的相对位置）
        blocks: [
          [0, 0, 0, 0],
          [1, 1, 1, 1],
        ],
        // 方块的形状（移除了空行空列）
        thinBlocks: [[1, 1, 1, 1]],
      },
      // 向右方向
      right: {
        color: "#fa1e1e",
        blocks: [
          [0, 0, 1],
          [0, 0, 1],
          [0, 0, 1],
          [0, 0, 1],
        ],
        thinBlocks: [[1], [1], [1], [1]],
      },
      // 向下方向
      down: {
        color: "#fa1e1e",
        blocks: [
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [1, 1, 1, 1],
        ],
        thinBlocks: [[1, 1, 1, 1]],
      },
      // 向左方向
      left: {
        color: "#fa1e1e",
        blocks: [
          [0, 1],
          [0, 1],
          [0, 1],
          [0, 1],
        ],
        thinBlocks: [[1], [1], [1], [1]],
      },
    },
    J: {
      up: {
        color: "#42c6f0",
        blocks: [
          [0, 1],
          [0, 1],
          [1, 1],
        ],
        thinBlocks: [
          [0, 1],
          [0, 1],
          [1, 1],
        ],
      },
      right: {
        color: "#42c6f0",
        blocks: [
          [1, 0, 0],
          [1, 1, 1],
        ],
        thinBlocks: [
          [1, 0, 0],
          [1, 1, 1],
        ],
      },
      down: {
        color: "#42c6f0",
        blocks: [
          [0, 1, 1],
          [0, 1, 0],
          [0, 1, 0],
        ],
        thinBlocks: [
          [1, 1],
          [1, 0],
          [1, 0],
        ],
      },
      left: {
        color: "#42c6f0",
        blocks: [
          [0, 0, 0],
          [1, 1, 1],
          [0, 0, 1],
        ],
        thinBlocks: [
          [1, 1, 1],
          [0, 0, 1],
        ],
      },
    },
    L: {
      up: {
        color: "#f5821f",
        blocks: [
          [0, 1, 0],
          [0, 1, 0],
          [0, 1, 1],
        ],
        thinBlocks: [
          [1, 0],
          [1, 0],
          [1, 1],
        ],
      },
      right: {
        color: "#f5821f",
        blocks: [
          [0, 0, 0],
          [1, 1, 1],
          [1, 0, 0],
        ],
        thinBlocks: [
          [1, 1, 1],
          [1, 0, 0],
        ],
      },
      down: {
        color: "#f5821f",
        blocks: [
          [1, 1],
          [0, 1],
          [0, 1],
        ],
        thinBlocks: [
          [1, 1],
          [0, 1],
          [0, 1],
        ],
      },
      left: {
        color: "#f5821f",
        blocks: [
          [0, 0, 1],
          [1, 1, 1],
        ],
        thinBlocks: [
          [0, 0, 1],
          [1, 1, 1],
        ],
      },
    },
    O: {
      up: {
        color: "#f1fa1e",
        blocks: [
          [1, 1],
          [1, 1],
        ],
        thinBlocks: [
          [1, 1],
          [1, 1],
        ],
      },
      right: {
        color: "#f1fa1e",
        blocks: [
          [1, 1],
          [1, 1],
        ],
        thinBlocks: [
          [1, 1],
          [1, 1],
        ],
      },
      down: {
        color: "#f1fa1e",
        blocks: [
          [1, 1],
          [1, 1],
        ],
        thinBlocks: [
          [1, 1],
          [1, 1],
        ],
      },
      left: {
        color: "#f1fa1e",
        blocks: [
          [1, 1],
          [1, 1],
        ],
        thinBlocks: [
          [1, 1],
          [1, 1],
        ],
      },
    },
    S: {
      up: {
        color: "#4bd838",
        blocks: [
          [0, 0, 0],
          [0, 1, 1],
          [1, 1, 0],
        ],
        thinBlocks: [
          [0, 1, 1],
          [1, 1, 0],
        ],
      },
      right: {
        color: "#4bd838",
        blocks: [
          [1, 0],
          [1, 1],
          [0, 1],
        ],
        thinBlocks: [
          [1, 0],
          [1, 1],
          [0, 1],
        ],
      },
      down: {
        color: "#4bd838",
        blocks: [
          [0, 1, 1],
          [1, 1, 0],
        ],
        thinBlocks: [
          [0, 1, 1],
          [1, 1, 0],
        ],
      },
      left: {
        color: "#4bd838",
        blocks: [
          [0, 1, 0],
          [0, 1, 1],
          [0, 0, 1],
        ],
        thinBlocks: [
          [1, 0],
          [1, 1],
          [0, 1],
        ],
      },
    },
    T: {
      up: {
        color: "#d838cb",
        blocks: [
          [0, 0, 0],
          [1, 1, 1],
          [0, 1, 0],
        ],
        thinBlocks: [
          [1, 1, 1],
          [0, 1, 0],
        ],
      },
      right: {
        color: "#d838cb",
        blocks: [
          [0, 1],
          [1, 1],
          [0, 1],
        ],
        thinBlocks: [
          [0, 1],
          [1, 1],
          [0, 1],
        ],
      },
      down: {
        color: "#d838cb",
        blocks: [
          [0, 1, 0],
          [1, 1, 1],
        ],
        thinBlocks: [
          [0, 1, 0],
          [1, 1, 1],
        ],
      },
      left: {
        color: "#d838cb",
        blocks: [
          [0, 1, 0],
          [0, 1, 1],
          [0, 1, 0],
        ],
        thinBlocks: [
          [1, 0],
          [1, 1],
          [1, 0],
        ],
      },
    },
    Z: {
      up: {
        color: "#fa1e1e",
        blocks: [
          [0, 0, 0],
          [1, 1, 0],
          [0, 1, 1],
        ],
        thinBlocks: [
          [1, 1, 0],
          [0, 1, 1],
        ],
      },
      right: {
        color: "#fa1e1e",
        blocks: [
          [0, 1],
          [1, 1],
          [1, 0],
        ],
        thinBlocks: [
          [0, 1],
          [1, 1],
          [1, 0],
        ],
      },
      down: {
        color: "#fa1e1e",
        blocks: [
          [1, 1, 0],
          [0, 1, 1],
        ],
        thinBlocks: [
          [1, 1, 0],
          [0, 1, 1],
        ],
      },
      left: {
        color: "#fa1e1e",
        blocks: [
          [0, 0, 1],
          [0, 1, 1],
          [0, 1, 0],
        ],
        thinBlocks: [
          [0, 1],
          [1, 1],
          [1, 0],
        ],
      },
    },
  };

  // 配置项（可由外部传入覆盖）
  const _configs = {
    gridSize: 20, // 格子的边长（像素）

    // 步长配置，即方块自动下落需要的时长（毫秒数）
    setpSize: {
      start: 600, // 初始值
      decrement: 5, // 每次消灭一行的衰减值
      min: 100, // 最小值
    },

    // 事件处理函数
    gameOver: null, // 游戏失败回调函数
    scoreChange: null, // 游戏得分变化回调函数
    rowsChange: null, // 已经消灭行数变化回调函数
  };

  // 画布数据
  const _datas = {
    gColNum: 0, // 游戏画布列数（横向格子数量）
    gRowNum: 0, // 游戏画布行数（纵向格子数量）
    score: 0, // 游戏得分
    rows: 0, // 已经消灭的行数
    grids: [], // 游戏画布格子，按照游戏画布的宽高拆分成多份格子
    actions: [], // 玩家操作指令队列
    lastDropTime: 0, // 上一次方块自动下落的时间（精确到毫秒）
    setpSize: 0, // 当前步长，方块每次下落需要的时间长度（毫秒）
    currentPiece: null, // 当前正在下落的方块
    nextPiece: null, // 下一枚方块
    pieceContainer: [], // 存放一批固定的方块，每次随机获取，取完之后会再次生成一批
  };

  /**
   * 产生一个指定范围的随机整数
   * @param {integer} min 最小值（包含）
   * @param {integer} max 最大值（不包含）
   * @returns
   */
  const _getRandomInteger = function (min, max) {
    return parseInt(min + Math.random() * (max - min), 10);
  };

  /**
   * 产生一枚随机的方块
   * @returns
   */
  const _getRandomPiece = function () {
    // 当方块容器中的方块已经取完时，重新生成一批
    if (_datas.pieceContainer.length == 0) {
      const batch = [
        "I",
        "I",
        "I",
        "I",
        "J",
        "J",
        "J",
        "J",
        "L",
        "L",
        "L",
        "L",
        "O",
        "O",
        "O",
        "O",
        "S",
        "S",
        "S",
        "S",
        "T",
        "T",
        "T",
        "T",
        "Z",
        "Z",
        "Z",
        "Z",
      ];
      batch.forEach((type) => {
        // 获取指定类型模板
        const template = _pieceTemplate[type];

        // 获取一个随机的方向
        const dirMap = {
          0: "up",
          1: "right",
          2: "down",
          3: "left",
        };
        const dir = dirMap[_getRandomInteger(0, 4)];
        // 生成随机的位置
        const pColNum = template[dir].blocks[0].length;
        const pRowNum = template[dir].blocks.length;
        const colIdx = _getRandomInteger(0, _datas.gColNum - pColNum);
        const rowIdx = -pRowNum;

        // 生成方块
        _datas.pieceContainer.push({
          template,
          dir,
          colIdx,
          rowIdx,
        });
      });
    }

    // 获取一个随机位置
    const random = _getRandomInteger(0, _datas.pieceContainer.length - 1);

    // 向方块容器中取出该方块
    return _datas.pieceContainer.splice(random, 1)[0];
  };

  /**
   * 绘制“下一枚方块”区域
   * - 将方块绘制在区域中间
   * - 绘制的方块，跟游戏画布中的方块大小一致
   */
  const _drawNext = function () {
    // 画布宽高
    const canvasWidth = _nElement.clientWidth;
    const canvasHeight = _nElement.clientHeight;
    const minSize = 4 * _configs.gridSize;
    if (canvasWidth < minSize || canvasHeight < minSize) {
      throw new Error(`下一个方块画布宽高小于${minSize}px`);
    }

    // 清空画布
    _nContext.clearRect(0, 0, canvasWidth, canvasHeight);

    // 方块的行数和列数
    const thinBlocks = _datas.nextPiece.template[_datas.nextPiece.dir].thinBlocks;
    const pColNum = thinBlocks[0].length;
    const pRowNum = thinBlocks.length;

    // 计算绘制的边距
    const paddingLeft = (canvasWidth - pColNum * _configs.gridSize) / 2;
    const paddingTop = (canvasHeight - pRowNum * _configs.gridSize) / 2;

    // 遍历格子
    for (let row = 0; row < pRowNum; row++) {
      for (let col = 0; col < pColNum; col++) {
        // 判断方块的有效格子
        if (thinBlocks[row][col]) {
          // 绘制格子
          _nContext.fillStyle = _datas.nextPiece.template[_datas.nextPiece.dir].color;
          _nContext.fillRect(
            paddingLeft + col * _configs.gridSize,
            paddingTop + row * _configs.gridSize,
            _configs.gridSize,
            _configs.gridSize
          );
        }
      }
    }
  };

  /**
   * 处理键盘事件
   * @param {object} event
   */
  const _handleKeydown = function (event) {
    // 游戏中状态才执行
    if (_isPlaying) {
      // 是否其他无用按键
      let otherKey = false;

      // 按照按键类型处理
      switch (event.keyCode) {
        // 向左方向键
        case 37:
          _datas.actions.push("left");
          break;
        // 向上方向键
        case 38:
          _datas.actions.push("up");
          break;
        // 向右方向键
        case 39:
          _datas.actions.push("right");
          break;
        // 向下方向键
        case 40:
          _datas.actions.push("down");
          break;
        // 其他
        default:
          otherKey = true;
          break;
      }

      // 防止方向键滚动页面
      if (!otherKey) event.preventDefault();
    }
  };

  /**
   * 初始化画布
   * @param {string} gameId 游戏画布ID
   * @param {string} nextId 下一个方块画布ID
   */
  const _init = function (gameId, nextId) {
    // 画布ID
    _gId = gameId;
    _nId = nextId;
    if (typeof _gId !== "string" || !_gId) throw new Error("游戏画布ID有误");
    if (typeof _nId !== "string" || !_nId) throw new Error("下一个方块画布ID有误");

    // 获取画布元素
    _gElement = document.getElementById(_gId);
    _nElement = document.getElementById(nextId);
    if (!_gElement) throw new Error("游戏画布不存在");
    if (!_nElement) throw new Error("下一个方块画布不存在");

    // 取画布上下文
    _gContext = _gElement.getContext("2d");
    _nContext = _nElement.getContext("2d");
    if (!_gContext) throw new Error("获取游戏画布上下文失败");
    if (!_nContext) throw new Error("获取下一个方块画布上下文失败");

    // 设置画布逻辑宽高
    _gElement.height = _gElement.clientHeight;
    _gElement.width = _gElement.clientWidth;
    _nElement.height = _nElement.clientHeight;
    _nElement.width = _nElement.clientWidth;

    // 阻止画布右键菜单
    _gElement.oncontextmenu = function (event) {
      event.preventDefault();
    };
    _nElement.oncontextmenu = function (event) {
      event.preventDefault();
    };

    // 计算游戏格子行列数
    _datas.gColNum = Math.floor(_gElement.clientWidth / _configs.gridSize);
    _datas.gRowNum = Math.floor(_gElement.clientHeight / _configs.gridSize);

    // 初始化下一枚方块
    _datas.nextPiece = _getRandomPiece();

    // 绘制“下一枚方块”区域
    _drawNext();

    // 绑定事件
    document.addEventListener("keydown", _handleKeydown);
  };

  /**
   * 配置画布
   * 仅设置传入的配置项
   * @param {object} cfgs 配置项
   */
  const _setConfigs = function (cfgs = {}) {
    const { gridSize, setpSize, gameOver, scoreChange, rowsChange } = cfgs;
    const { start, decrement, min } = setpSize || {};

    // 格子的边长（像素）
    if (gridSize) _configs.gridSize = gridSize;

    // 步长初始值
    if (start) _configs.setpSize.start = start;

    // 步长衰减值
    if (decrement) _configs.setpSize.decrement = decrement;

    // 步长最小值
    if (min) _configs.setpSize.min = min;

    // 游戏结束回调函数
    if (gameOver) _configs.gameOver = gameOver;

    // 游戏获胜回调函数
    if (scoreChange) _configs.scoreChange = scoreChange;

    // 旗子数变化回调函数
    if (rowsChange) _configs.rowsChange = rowsChange;
  };

  /**
   * 检查画布配置
   */
  const _checkConfigs = function () {
    const { gridSize, setpSize, gameOver, scoreChange, rowsChange } = _configs;
    const { start, decrement, min } = setpSize;

    if (typeof gridSize !== "number" || gridSize <= 0) {
      throw new Error("格子的边长有误");
    }

    if (typeof start !== "number" || start <= 0) {
      throw new Error("步长初始值有误");
    }

    if (typeof decrement !== "number" || decrement <= 0) {
      throw new Error("步长衰减值有误");
    }

    if (typeof min !== "number" || min <= 0) {
      throw new Error("步长最小值有误");
    }

    if (gameOver && typeof gameOver !== "function") {
      throw new Error("游戏失败回调函数有误");
    }

    if (scoreChange && typeof scoreChange !== "function") {
      throw new Error("游戏得分变化回调函数有误");
    }

    if (rowsChange && typeof rowsChange !== "function") {
      throw new Error("已经消灭行数变化回调函数有误");
    }
  };

  /**
   * 停止游戏循环
   */
  const _stopGameLoop = async function () {
    // 延迟几帧让画面绘制完毕
    await new Promise((resolve) => {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          resolve(true);
        });
      });
    });

    // 更新游戏状态
    _isPlaying = false;
  };

  /**
   * 重置画布数据
   */
  const _resetData = function () {
    // 计算游戏格子行列数
    _datas.gColNum = Math.floor(_gElement.clientWidth / _configs.gridSize);
    _datas.gRowNum = Math.floor(_gElement.clientHeight / _configs.gridSize);

    // 重置游戏画布格子
    _datas.grids = [];
    for (let row = 0; row < _datas.gRowNum; row++) {
      for (let col = 0; col < _datas.gColNum; col++) {
        if (!_datas.grids[row]) _datas.grids[row] = [];
        _datas.grids[row][col] = 0;
      }
    }

    // 重置步长
    _datas.setpSize = _configs.setpSize.start;

    // 其他
    _datas.score = 0;
    _datas.rows = 0;
    _datas.actions = [];
    _datas.lastDropTime = new Date().getTime();
    _datas.currentPiece = _datas.nextPiece;
    _datas.nextPiece = _getRandomPiece();
  };

  /**
   * 判断指定方块，是否能移动到指定位置，或改变为指定方向
   * @param {object} piece
   * @param {integer} tarColIdx
   * @param {integer} tarRowIdx
   * @param {string} targetDir
   * @returns {boolean}
   */
  const _canPieceChange = function (piece, tarColIdx, tarRowIdx, targetDir) {
    let result = true;

    // 方块的行数和列数
    const blocks = piece.template[targetDir].blocks;
    const pColNum = blocks[0].length;
    const pRowNum = blocks.length;

    // 遍历格子
    for (let row = 0; row < pRowNum; row++) {
      for (let col = 0; col < pColNum; col++) {
        // 每个有效格子都进行判断
        if (blocks[row][col]) {
          if (
            tarColIdx + col < 0 || // 格子是否落在画布X轴左边之外
            tarColIdx + col >= _datas.gColNum || // 格子是否落在画布X轴右边之外
            // tarRowIdx + row < 0 || // 格子是否落在画布Y轴上方边之外
            tarRowIdx + row >= _datas.gRowNum || // 格子是否落在画布Y轴下边之外
            _getGameGrid(tarRowIdx + row, tarColIdx + col) // 该格子已经有被占用了
          ) {
            result = false;
          }
        }
      }
    }

    return result;
  };

  /**
   * 将当前方块固化游戏格子中
   */
  const _currentPieceToGrids = function () {
    // 当前方块的行数和列数
    const blocks = _datas.currentPiece.template[_datas.currentPiece.dir].blocks;
    const pColNum = blocks[0].length;
    const pRowNum = blocks.length;

    // 遍历格子
    for (let row = 0; row < pRowNum; row++) {
      for (let col = 0; col < pColNum; col++) {
        // 每个有效格子
        if (blocks[row][col]) {
          _datas.grids[_datas.currentPiece.rowIdx + row][_datas.currentPiece.colIdx + col] = 1;
        }
      }
    }
  };

  /**
   * 获取游戏画布指定格子
   * @param {integer} rowIdx
   * @param {integer} colIdx
   * @returns
   */
  const _getGameGrid = function (rowIdx, colIdx) {
    return _datas.grids && _datas.grids[rowIdx] ? _datas.grids[rowIdx][colIdx] : null;
  };

  /**
   * 增加行数
   * @param {integer} number
   */
  const _addRows = function (number) {
    // 增加行数
    _datas.rows += number;

    // 衰减步长
    _datas.setpSize = Math.max(
      _configs.setpSize.min,
      _configs.setpSize.start - _configs.setpSize.decrement * _datas.rows
    );

    // 回调事件
    if (_configs.rowsChange) {
      try {
        _configs.rowsChange(_datas.rows, number);
      } catch (error) {}
    }
  };

  /**
   * 增加积分
   * @param {integer} number
   */
  const _addScore = function (number) {
    // 增加积分
    _datas.score += number;

    // 回调事件
    if (_configs.scoreChange) {
      try {
        _configs.scoreChange(_datas.score, number);
      } catch (error) {}
    }
  };

  /**
   * 消灭成行的格子
   */
  const _removeLines = function () {
    // 本次累计消灭行数
    let rows = 0;

    // 从下到上遍历
    for (let row = _datas.gRowNum; row > 0; row--) {
      // 判断当前行是否填充完成
      let complete = true;
      for (let col = 0; col < _datas.gColNum; col++) {
        // 任意一个格子没有被填充，则表示未完成
        if (!_getGameGrid(row, col)) {
          complete = false;
          break;
        }
      }

      // 如果已完成
      if (complete) {
        // 清空当前行并将画布往下移动一格
        for (let r = row; r >= 0; r--) {
          for (let c = 0; c < _datas.gRowNum; c++) {
            if (r == 0) {
              _datas.grids[r][c] = 0;
            } else {
              if (_getGameGrid(r - 1, c)) {
                _datas.grids[r][c] = 1;
              } else {
                _datas.grids[r][c] = 0;
              }
            }
          }
        }

        // 重新检查当前行
        row = row + 1;

        // 累计消灭行数
        rows++;
      }
    }

    if (rows > 0) {
      // 添加已消灭行数
      _addRows(rows);

      // 添加积分
      _addScore(100 * Math.pow(2, rows - 1)); // 1: 100, 2: 200, 3: 400, 4: 800
    }
  };

  /**
   * 游戏结束
   */
  const _gameOver = async function () {
    // 停止游戏循环
    await _stopGameLoop();

    // 触发游戏结束事件
    if (_configs.gameOver) {
      try {
        _configs.gameOver();
      } catch (error) {}
    }
  };

  /**
   * 向指定方向移动当前方块
   * @param {string} dir
   * @returns {boolean} 是否移动成功
   */
  const _currentPieceMove = function (dir) {
    // 获取当前方块的位置作为初始的目标位置
    let tarColIdx = _datas.currentPiece.colIdx;
    let tarRowIdx = _datas.currentPiece.rowIdx;

    // 再根据移动方向改变目标位置
    switch (dir) {
      case "right":
        tarColIdx = tarColIdx + 1;
        break;
      case "left":
        tarColIdx = tarColIdx - 1;
        break;
      case "down":
        tarRowIdx = tarRowIdx + 1;
        break;
    }

    // 判断方块能否移动到目标位置
    const canMove = _canPieceChange(_datas.currentPiece, tarColIdx, tarRowIdx, _datas.currentPiece.dir);

    // 可以移动，则实际改变当前方块位置
    if (canMove) {
      _datas.currentPiece.colIdx = tarColIdx;
      _datas.currentPiece.rowIdx = tarRowIdx;
      return true;
    }

    // 不能移动
    else {
      // 向下移动时移动不了，说明已经到底或者有障碍物
      if (dir === "down") {
        // 当前方块在画布之上，则结束游戏
        if (_datas.currentPiece.rowIdx < 0) {
          _gameOver();
          return;
        }

        // 将当前方块固化游戏格子中
        _currentPieceToGrids();

        // 消灭成行的格子
        _removeLines();

        // 重新初始化方块
        _datas.currentPiece = _datas.nextPiece;
        _datas.nextPiece = _getRandomPiece();

        // 清空所有玩家操作指令
        _datas.actions = [];
      }

      return false;
    }
  };

  /**
   * 方块变形
   */
  const _currentPieceRotate = function () {
    // 变换方向
    let newDir = _datas.currentPiece.dir;
    switch (_datas.currentPiece.dir) {
      case "up": {
        newDir = "right";
        break;
      }
      case "right": {
        newDir = "down";
        break;
      }
      case "down": {
        newDir = "left";
        break;
      }
      case "left": {
        newDir = "up";
        break;
      }
    }

    // 可以移动到目标方向，则实际改变方块方向
    if (_canPieceChange(_datas.currentPiece, _datas.currentPiece.colIdx, _datas.currentPiece.rowIdx, newDir)) {
      _datas.currentPiece.dir = newDir;
    }
  };

  /**
   * 处理玩家操作
   */
  const _handlePlayerAction = function () {
    // 取出玩家操作队列中第一个操作
    const action = _datas.actions.shift();

    // 按照操作类型进行处理
    switch (action) {
      case "left":
        _currentPieceMove("left");
        break;
      case "right":
        _currentPieceMove("right");
        break;
      case "down":
        _currentPieceMove("down");
        break;
      case "up":
        _currentPieceRotate();
        break;
    }
  };

  /**
   * 处理自动下落
   */
  const _handleAutoDrop = function () {
    // 当前时间
    const now = new Date().getTime();

    // 距离上一次方块自动下落的时长（毫秒数）
    const duration = now - _datas.lastDropTime;

    // 如果距离上次方块下落时长，超过规定的步长，则执行下落
    if (duration > _datas.setpSize) {
      _datas.lastDropTime = now;
      _currentPieceMove("down");
    }
  };

  /**
   * 绘制游戏区域
   */
  const _drawGame = function () {
    // 清空游戏画布
    _gContext.clearRect(0, 0, _gElement.width, _gElement.height);

    /* 绘制当前方块 */
    // 当前方块的行数和列数
    const blocks = _datas.currentPiece.template[_datas.currentPiece.dir].blocks;
    const pColNum = blocks[0].length;
    const pRowNum = blocks.length;
    // 遍历格子
    for (let row = 0; row < pRowNum; row++) {
      for (let col = 0; col < pColNum; col++) {
        // 绘制每个有效格子
        if (blocks[row][col]) {
          _gContext.fillStyle = _datas.currentPiece.template[_datas.currentPiece.dir].color;
          _gContext.fillRect(
            (_datas.currentPiece.colIdx + col) * _configs.gridSize,
            (_datas.currentPiece.rowIdx + row) * _configs.gridSize,
            _configs.gridSize,
            _configs.gridSize
          );
        }
      }
    }

    // 绘制所有固定的格子
    for (let r = 0; r < _datas.gRowNum; r++) {
      for (let c = 0; c < _datas.gColNum; c++) {
        if (_getGameGrid(r, c)) {
          _gContext.fillStyle = "black";
          _gContext.fillRect(c * _configs.gridSize, r * _configs.gridSize, _configs.gridSize, _configs.gridSize);
        }
      }
    }
  };

  /**
   * 重新绘制画布
   */
  const _repaint = function () {
    _drawGame();
    _drawNext();
  };

  /**
   * 游戏循环
   */
  const _gameLoop = () => {
    if (!_isPlaying) return;

    // 处理玩家操作
    _handlePlayerAction();

    // 处理自动下落
    _handleAutoDrop();

    // 重新绘制界面
    _repaint();

    // 设置下一帧继续处理
    requestAnimationFrame(_gameLoop);
  };

  /**
   * 启动游戏循环
   */
  const _startGameLoop = () => {
    // 更新游戏状态
    _isPlaying = true;

    // 执行游戏循环
    _gameLoop();
  };

  /**
   * 启动画布
   * @param {object} cfgs 配置项
   */
  const _run = async function (cfgs = {}) {
    // 配置画布
    _setConfigs(cfgs);

    // 检查画布配置
    _checkConfigs();

    // 重置画布数据
    _resetData();

    // 启动游戏循环
    _startGameLoop();
  };

  ////////// 实例化逻辑 //////////

  // 配置画布
  _setConfigs(configs);

  // 检查画布配置
  _checkConfigs();

  // 初始化画布
  _init(gId, nId);

  ////////// 以下是公有方法 //////////

  /**
   * 重置画布
   * @param {object} cfgs 配置项
   */
  this.rerun = async function (cfgs = {}) {
    // 停止游戏循环
    await _stopGameLoop();

    // 启动画布
    _run(cfgs);
  };
}
