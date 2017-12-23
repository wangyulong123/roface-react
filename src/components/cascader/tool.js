/* eslint-disable */

export const attributes = {
    id: 'DemographicId',
    parentId: 'ParentId',
    name: 'Name',
    rootId: null,
};

export const transformIntoTree = (data, attributes) => {
    /**
     * 将城市信息，公司信息的扁平结构转化为树状结构
     * @params data: 转换到树形结构的数据，type=array
     * @params attributes: 树形结构中节点的命名，type=object
     * @returns: { tree }: 树结构和节点命名形式
     *
     * attributes 例子:
     *      let attributes = {
     *          id: 'DemographicId',
     *          parentId: 'ParentId',
     *          name: 'Name',
     *          rootId: null
     *      };
     **/
    let resData = data;
    let tree = [];

    resData.forEach((item, index) => {
        if (item.ParentId === attributes.rootId) {
            let obj = {
                id: item[attributes.id],
                value: item[attributes.name],
                label: item[attributes.name],
                children: []
            };
            tree.push(obj);
            resData.splice(index, 1);
        }
    });

    function run(childArr) {
        if (resData.length !== 0) {
            for (let i = 0; i < childArr.length; i++) {
                for (let j = 0; j < resData.length; j++) {
                    if (childArr[i].id === resData[j][attributes.parentId]) {
                        let obj = {
                            id: resData[j][attributes.id],
                            value: resData[j][attributes.name],
                            label: resData[j][attributes.name],
                            children: [],
                        };
                        childArr[i].children.push(obj);
                        resData.splice(j, 1);
                        j--;
                    }
                }
                run(childArr[i].children);
            }
        }
    }
    run(tree);

    return tree;
};

export const cascaderCodemap = [{
    DemographicId: 1,
    ParentId: null,
    Name: '阿里巴巴（中国）',
},{
    DemographicId: 3,
    ParentId: 2,
    Name: '中超联赛有限责任公司',
},{
    DemographicId: 2,
    ParentId: 1,
    Name: '恒大淘宝足球',
},{
    DemographicId: 4,
    ParentId: 1,
    Name: '杭州魅投信息技术有限公司',
},{
    DemographicId: 5,
    ParentId: 4,
    Name: '珠海市魅族科技有限公司',
},{
    DemographicId: 6,
    ParentId: 5,
    Name: '珠海市魅族通讯设备有限公司',
},{
    DemographicId: 7,
    ParentId: 1,
    Name: '杭州阿里巴巴泽泰信息技术有限公司',
},{
    DemographicId: 8,
    ParentId: 1,
    Name: '北京雅观科技有限公司',
},{
    DemographicId: 9,
    ParentId: 1,
    Name: '径圆（上海）信息技术有限公司',
},{
    DemographicId: 10,
    ParentId: 9,
    Name: '生活半径（北京）信息技术有限公司',
},{
    DemographicId: 11,
    ParentId: 1,
    Name: '上海多维度网络科技股份有限公司',
},{
    DemographicId: 12,
    ParentId: 1,
    Name: '深圳市瑞云科技有限公司',
},{
    DemographicId: 13,
    ParentId: 12,
    Name: '深圳市云语科技有限公司',
},{
    DemographicId: 14,
    ParentId: null,
    Name: '深圳市腾讯计算机系统有限公司',
},{
    DemographicId: 15,
    ParentId: 14,
    Name: '华谊兄弟传媒股份有限公司',
},{
    DemographicId: 16,
    ParentId: 15,
    Name: '华谊兄弟影院投资有限公司',
},{
    DemographicId: 17,
    ParentId: 16,
    Name: '深圳华谊兄弟影院管理有限公司',
},{
    DemographicId: 18,
    ParentId: 16,
    Name: '北京新影联华谊兄弟影院有限公司',
},{
    DemographicId: 19,
    ParentId: 14,
    Name: '深圳市财付通网络金融小额贷款有限公司',
},{
    DemographicId: 20,
    ParentId: 14,
    Name: '深圳市腾通讯创业基地发展有限公司',
},{
    DemographicId: 21,
    ParentId: 20,
    Name: '上海寰创通信科技股份有限公司',
},{
    DemographicId: 22,
    ParentId: 21,
    Name: '浙江新舍网络科技有限公司',
},{
    DemographicId: 30,
    ParentId: 22,
    Name: '浙江新舍网络科技有限公司2',
},{
    DemographicId: 31,
    ParentId: 30,
    Name: '浙江新舍网络科技有限公司4',
},{
    DemographicId: 23,
    ParentId: 21,
    Name: '上海寰创网络科技有限公司',
},{
    DemographicId: 24,
    ParentId: 20,
    Name: '乐活无限（北京）科技有限公司',
},{
    DemographicId: 25,
    ParentId: 24,
    Name: '天使创投（北京）科技有限公司',
},{
    DemographicId: 26,
    ParentId: 14,
    Name: '北京搜狗信息服务有限公司',
},{
    DemographicId: 27,
    ParentId: 26,
    Name: '北京智者天下科技有限公司',
},{
    DemographicId: 28,
    ParentId: 26,
    Name: '深圳市世纪光速信息技术有限公司',
},{
    DemographicId: 29,
    ParentId: 14,
    Name: '深圳市腾讯动漫有限公司',
}];
