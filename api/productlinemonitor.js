var express = require('express');
const echarts = require('echarts');
var router = express.Router();

//  这里只是暂时将所有变量声明  可能会遇到命名冲突的问题

// 仪表盘一
const barOptions = {
  title: {
    text: "公司部门"
  },
  color: ['rgb(45, 140, 240)'],
  tooltip: {},
  legend: {
      data:["人员数"]
  },
  xAxis: {
    data: ["市场部", "销售部", "财务部", "研发部", "人事部", "行政部", "客服部"]
  },
  yAxis: {
    name: "人员数"
  },
  series: [
    {
      name: '人员数',
      type: 'bar',
      data: [65, 75, 21, 46, 20, 19, 19]
    }
  ]
};

//  仪表盘二
const types = ['智慧养老服务', '潮爸辣妈学院', '微商城', '短信服务', '金融理财'];
const pieOptions = {
    title : {
        text: '公司业务',
        left: 'center'
    },
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
        orient: 'vertical',
        left: 'left',
        data: types
    },
    series : [
        {
          type: "pie",
          name: "营业额（万）",
          data: [
            {value: 2000, name: types[0]},
            {value: 1000, name: types[1]},
            {value: 700, name: types[2]},
            {value: 500, name: types[3]},
            {value: 1000, name: types[4]}
          ]
        }
    ]
};

//  仪表盘三
const targetCoord = [1000, 140]
const curveness = 0.2
const linesData = []
const categories = [{
    name: '流入中',
    itemStyle: {
        normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                offset: 0,
                color: '#01acca'
            }, {
                offset: 1,
                color: '#5adbe7'
            }]),
        }
    },
    label: {
        normal: {
            fontSize: '14'
        }
    },
}, {
    name: '暂无流入',
    itemStyle: {
        normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                offset: 0,
                color: '#ffb402'
            }, {
                offset: 1,
                color: '#ffdc84'
            }]),
        }
    },
    label: {
        normal: {
            fontSize: '14'
        }
    },
}]

const item = {
    name: "数据中心",
    value: targetCoord,
    symbolSize: 100,
    itemStyle: {
        normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                offset: 0,
                color: '#157eff'
            }, {
                offset: 1,
                color: '#35c2ff'
            }]),
        }
    },
    label: {
        normal: {
            fontSize: '14'
        }
    },
}

const items = [{
    name: "子平台1",
    category: 0,
    active: true,
    speed: '50kb/s',
    value: [0, 0]
}, {
    name: "子平台2",
    category: 0,
    active: true,
    speed: '50kb/s',
    value: [0, 100]
}, {
    name: "子平台3",
    category: 1,
    value: [0, 200]
}, {
    name: "子平台4",
    category: 1,
    value: [0, 300]
}]

const data = items.concat([item])

items.forEach(function(el) {
    if (el.active) {
        linesData.push([{
            coord: el.value
        }, {
            coord: targetCoord
        }])
    }
})

const links = items.map((el) => {
    return {
        source: el.name,
        target: item.name,
        speed: el.speed,
        lineStyle: {
            normal: {
                color: el.speed ? '#12b5d0' : '#ff0000',
                curveness: curveness,
            }
        },
    }
})

const lineOptions = {
    legend: [{
        formatter: function(name) {
            return echarts.format.truncateText(name, 100, '14px Microsoft Yahei', '…');
        },
        tooltip: {
            show: true
        },
        textStyle: {
            color: '#999'
        },
        selectedMode: false,
        right: 0,
        data: categories.map(function(el) {
            return el.name
        })
    }],
    xAxis: {
        show: false,
        type: 'value'
    },
    yAxis: {
        show: false,
        type: 'value'
    },
    series: [{
        type: 'graph',
        layout: 'none',
        coordinateSystem: 'cartesian2d',
        symbolSize: 60,
        z: 3,
        edgeLabel: {
            normal: {
                show: true,
                textStyle: {
                    fontSize: 14
                },
                formatter: function(params) {
                    let txt = ''
                    if (params.data.speed !== undefined) {
                        txt = params.data.speed
                    }
                    return txt
                },
            }
        },
        label: {
            normal: {
                show: true,
                position: 'bottom',
                color: '#5e5e5e'
            }
        },
        itemStyle: {
            normal: {
                shadowColor: 'none'
            },
            emphasis: {

            }
        },
        lineStyle: {
            normal: {
                width: 2,
                shadowColor: 'none'
            },
        },
        edgeSymbol: ['none', 'arrow'],
        edgeSymbolSize: 8,
        data: data,
        links: links,
        categories: categories
    }, {
        name: 'A',
        type: 'lines',
        coordinateSystem: 'cartesian2d',
        z: 1,
        effect: {
            show: true,
            smooth: false,
            trailLength: 0,
            symbol: "arrow",
            color: 'rgba(55,155,255,0.5)',
            symbolSize: 12
        },
        lineStyle: {
            normal: {
                curveness: curveness
            }
        },
        data: linesData
    }]
}

//  第四个表盘 未经过vuex
var cellphone = ['iPhone X', '一加5', 'HTC U11+', '小米MIX 2', 'Moto Z 2018', '三星GALAXY Note 8', '努比亚Z17S', '努比亚Z17'];
var cellPhone1 = ['荣耀V10', '三星GALAXY S8', '苹果iPhone 7 Plus', '索尼Xperia XZ1', '华为Mate 10', '索尼Xperia XZ Premium', '小米6', '华为P10'];
var cellphoneTotle = cellphone.concat(cellPhone1);
var data1 = [];
for (var i = 0; i < 8; ++i) {
    data1.push({
        name: cellphone[i],
        value: 2,
        label: {
            position: 'inside',
            rotate: 'tangential'
        },
        children: [{
            name: '',
            value: 2,
            label: {
                position: 'inside',
                rotate: 'tangential',
            },
            children: [{
                name: cellPhone1[i],
                value: 2,
                label: {
                    position: 'inside',
                    rotate: 'tangential',
                }
            }]
        }]

    });
}


const guageOptions = {
    title: {
        text: '手机CPU性能',
        subtext: 'http://mobile.zol.com.cn/soc/',
        sublink: 'http://mobile.zol.com.cn/soc/'
    },
    tooltip: {
        show: false
    },
    legend: {
        type: 'scroll',
        orient: 'vertical',
        top: '20%',
        left: '0.5%',
        data: cellphoneTotle
    },
    radar: {
        shape: 'circle',
        scale: true,
        indicator: [{
                text: '综合性能',
            },
            {
                text: 'ANTUTU',
            },
            {
                text: '3DMark',
            },
            {
                text: 'GeekBench4',
            },

        ],
        center: ['50%', '50%'],
        radius: '28%'
    },

    series: [{
        type: 'radar',
        name:'guage',
        zlevel: 2,
        tooltip:{
            show:true
        },
        data: [{
                value: [10, 217397, 61474, 10304],
                name: 'iPhone X'
            },
            {
                value: [7.2, 180796, 40453, 6761],
                name: '一加5'
            },
            {
                value: [7, 172144, 42047, 6513],
                name: 'HTC U11+'
            },
            {
                value: [7, 174517, 41345, 6580],
                name: '小米MIX 2'
            },
            {
                value: [6.9, 171737, 40029, 6611],
                name: 'Moto Z 2018'
            },
            {
                value: [6.9, 174331, 40187, 6423],
                name: '三星GALAXY Note 8'
            },
            {
                value: [6.9, 178336, 36496, 6806],
                name: '努比亚Z17S'
            },
            {
                value: [6.7, 178618, 35035, 6464],
                name: '努比亚Z17'
            },
            {
                value: [6.6, 173468, 32242, 6701],
                name: '荣耀V10'
            },
            {
                value: [6.6, 173236, 36631, 6108],
                name: '三星GALAXY S8'
            },
            {
                value: [6.6, 172644, 37334, 5965],
                name: '苹果iPhone 7 Plus'
            },
            {
                value: [6.4, 156209, 39466, 5914],
                name: '索尼Xperia XZ1'
            },
            {
                value: [6.4, 173996, 31847, 6330],
                name: '华为Mate 10'
            },
            {
                value: [6.4, 165425, 33527, 6287],
                name: '索尼Xperia XZ Premium'
            },
            {
                value: [6.1, 143990, 39643, 5390],
                name: '小米6'
            },
            {
                value: [5.7, 138505, 27552, 6591],
                name: '华为P10'
            },
        ]
    }, {
        type: 'sunburst',
        center: ['52%', '50%'],
        nodeClick: false,
        levels: [{}, {
            r0: '60%',
            r: '70%',
            label: {},
            itemStyle: {
                //shadowBlur: 4,
                borderWidth: 8,
                borderColor: '#42ced1',
            }
        }, {
            r0: '74%',
            r: '76%',
            label: {},
            itemStyle: {
                borderWidth: 2,
                borderColor: '#42b0d1',
                opacity: 0.8
            }
        }, {
            r0: '80%',
            r: '88%',

            itemStyle: {
                borderWidth: 8,
                borderColor: '#22bfb1',
                opacity: 0.6
            }
        }],
        data: data1,

    }]
};
//  这是第五个表盘的数据
zhuOptions = {
  backgroundColor: '#011c3a',
  xAxis: {
      data: ['涉恐人员', '涉稳人员', '涉毒人员', '在逃人员', '刑事犯罪\n前科、劣迹人员', '肇事肇祸\n精神病人', '重点上访\n人员'],
      axisLine: {
          lineStyle: {
              color: '#0177d4'
          }
      },
      axisLabel: {
          color: '#fff',
          fontSize: 14
      }
  },
  yAxis: {
      name: "（人）",
      nameTextStyle: {
          color: '#fff',
          fontSize: 16
      },
      axisLine: {
          lineStyle: {
              color: '#0177d4'
          }
      },
      axisLabel: {
          color: '#fff',
          fontSize: 16
      },
      splitLine: {
          show:false,
          lineStyle: {
              color: '#0177d4'
          }
      },
      interval:500,
      max:5000

  },
  series: [{
      type: 'bar',
      barWidth: 18,
      itemStyle:{
          normal:{
              color:new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: '#00b0ff'
              }, {
                  offset: 0.8,
                  color: '#7052f4'
              }], false)
          }
      },
      data: [254, 3254, 1654, 2454, 4757, 2011, 1211]
  }]
};


// 抛出第一个接口的数据
const productlinemonitordata={
  barOptions:barOptions,
  pieOptions:pieOptions,
  lineOptions:lineOptions
}


// 生产线监控模块的数据
router.post('/productlinemonitordata',function(req,res){
  res.send({
    code:"1006",
    msg:"成功",
    data:productlinemonitordata
  })
})

// 表盘的接口 返回表盘数据
router.post('/guageoptiondata',function(req,res){
  res.send({
    code:"1008",
    msg:"成功",
    data:guageOptions
  })
})

module.exports = router
