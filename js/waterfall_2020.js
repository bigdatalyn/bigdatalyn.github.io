/* jshint asi:true */
//先等图片都加载完成
//再执行布局函数

/**
 * 执行主函数
 * @param  {[type]} function( [description]
 * @return {[type]}           [description]
 */
(function() {

    /**
     * 内容JSON
     */
    var demoContent = [
        {
            demo_link: 'http://www.amazon.cn/%E9%BB%84%E4%BB%81%E5%AE%87%E4%BD%9C%E5%93%81-%E4%B8%87%E5%8E%86%E5%8D%81%E4%BA%94%E5%B9%B4-%E4%B8%AD%E5%9B%BD%E5%A4%A7%E5%8E%86%E5%8F%B2-%E5%85%B12%E5%86%8C-%E9%BB%84%E4%BB%81%E5%AE%87/dp/B00XC0TS6M/ref=sr_1_4?ie=UTF8&qid=1455416605&sr=8-4&keywords=%E4%B8%87%E5%8E%86%E5%8D%81%E4%BA%94%E5%B9%B4',
            img_link: '/files/books/wanlishiwunian.jpg',
            title: '万历十五年',
			core_tech: '历史',
            description: ' <font color="#0066CC">《万历十五年》（1587, a Year of No Significance）是三联书店出版的一部明史研究专著，作者是黄仁宇。</font> <a href ="http://www.amazon.cn/%E9%BB%84%E4%BB%81%E5%AE%87%E4%BD%9C%E5%93%81-%E4%B8%87%E5%8E%86%E5%8D%81%E4%BA%94%E5%B9%B4-%E4%B8%AD%E5%9B%BD%E5%A4%A7%E5%8E%86%E5%8F%B2-%E5%85%B12%E5%86%8C-%E9%BB%84%E4%BB%81%E5%AE%87/dp/B00XC0TS6M/ref=sr_1_4?ie=UTF8&qid=1455416605&sr=8-4&keywords=%E4%B8%87%E5%8E%86%E5%8D%81%E4%BA%94%E5%B9%B4">Amazon 这里</a>。'
        }, {
        demo_link: 'http://www.amazon.cn/%E7%AE%97%E6%B3%95%E5%AF%BC%E8%AE%BA-Thomas-H-Cormen/dp/B00AK7BYJY/ref=sr_1_1?ie=UTF8&qid=1455416307&sr=8-1&keywords=%E7%AE%97%E6%B3%95%E5%AF%BC%E8%AE%BA%EF%BC%88%E5%8E%9F%E4%B9%A6%E7%AC%AC3%E7%89%88%EF%BC%89',
        img_link: '/files/books/algorithms.jpg',
        code_link: 'http://www.amazon.cn/%E7%AE%97%E6%B3%95%E5%AF%BC%E8%AE%BA-Thomas-H-Cormen/dp/B00AK7BYJY/ref=sr_1_1?ie=UTF8&qid=1455416307&sr=8-1&keywords=%E7%AE%97%E6%B3%95%E5%AF%BC%E8%AE%BA%EF%BC%88%E5%8E%9F%E4%B9%A6%E7%AC%AC3%E7%89%88%EF%BC%89',
        title: '算法导论',
        core_tech: '编程',
        description: '<font color="#FF8000">本书将严谨性和全面性融为一体，深入讨论各类算法，并着力使这些算法的设计和分析能为各个层次的读者接受。全书各章自成体系，可以作为独立的学习单元；算法以英语和伪代码的形式描述，具备初步程序设计经验的人就能看懂；说明和解释力求浅显易懂，不失深度和数学严谨性。</font>'
    }, {
        demo_link: 'https://item.jd.com/12527505.html',
        img_link: '/files/books/PostgresqlInternel.png',
        code_link: 'https://item.jd.com/12527505.html',
        title: 'PostgreSQL指南：内幕探索 [The Internals of PostgreSQL for Database Administr] ',
        core_tech: 'Database',
        description: 'font color="#FF8000">介绍了 PostgreSQL 内部的工作原理。为深入学习 PostgreSQL 源代码的导读手册，对于理解数据库原 理与 PostgreSQL 内部实现大有裨益。</font>'
    }, {
        demo_link: 'https://item.jd.com/12487298.html',
        img_link: '/files/books/PostgresqlIntroduce.png',
        code_link: 'https://item.jd.com/12487298.html',
        title: '由浅入深PostgreSQL ',
        core_tech: '开源数据库',
        description: '<font color="#AE57A4">深入介绍了开源数据库管理系统PostgreSQL的主要特性，包括并发控制、索引、高级SQL处理、日志和统计、查询优化、存储过程、安全性、高可用等。作者是具有18年PG（PostgreSQL）数据库经验的国外大牛。译者彭煜玮先生，武汉大学计算机学院副教授，PostgreSQL中国社区的核心成员。</font>'
    }, {
        demo_link: 'http://www.amazon.cn/Oracle-Database-9i-10g-11g%E7%BC%96%E7%A8%8B%E8%89%BA%E6%9C%AF-%E6%B7%B1%E5%85%A5%E6%95%B0%E6%8D%AE%E5%BA%93%E4%BD%93%E7%B3%BB%E7%BB%93%E6%9E%84-%E5%87%AF%E7%89%B9/dp/B004I91HDI/ref=sr_1_1?s=books&ie=UTF8&qid=1455417615&sr=1-1',
        img_link: '/files/books/OracleArt.jpg',
        code_link: 'http://www.amazon.cn/Oracle-Database-9i-10g-11g%E7%BC%96%E7%A8%8B%E8%89%BA%E6%9C%AF-%E6%B7%B1%E5%85%A5%E6%95%B0%E6%8D%AE%E5%BA%93%E4%BD%93%E7%B3%BB%E7%BB%93%E6%9E%84-%E5%87%AF%E7%89%B9/dp/B004I91HDI/ref=sr_1_1?s=books&ie=UTF8&qid=1455417615&sr=1-1',
        title: 'Oracle Database 9i/10g/11g编程艺术:深入数据库体系结构(第2版)',
        core_tech: '开源数据库',
        description: '<font color="#AE57A4">涵盖了所有重要的Oracle体系结构特性，重温Thomas Kyte大作</font>'
    }, {
        demo_link: 'https://item.jd.com/12405774.html',
        img_link: '/files/books/PostgresqlPractise.png',
        code_link: 'https://item.jd.com/12405774.html',
        title: 'PostgreSQL实战 ',
        core_tech: '开源数据库',
        description: '<font color="#FF8000">值得存放于身旁的PostgreSQL参考书，特别是性能分析、集群、分片、地理信息等高技术含量的章节，可以作为日常工作的有效参考。本书基于新的PostgreSQL 10版本，重点在于通过实际操作为读者全方位解读PostgreSQL。从安装配置、连接使用、数据管理、体系架构，到NoSQL操作、性能优化、集群部署、分布式、分片、地理信息，面面俱到。 </font>'
    }, {
        demo_link: 'http://www.amazon.cn/%E7%A9%B7%E7%90%86%E6%9F%A5%E6%99%BA%E6%85%A7%E4%B9%A6-%E6%9C%AC%E6%9D%B0%E6%98%8E%E2%80%A2%E5%AF%8C%E5%85%B0%E5%85%8B%E6%9E%97/dp/B00DGJ6S9O/ref=sr_1_2?s=books&ie=UTF8&qid=1455418672&sr=1-2',
        img_link: '/files/books/PoorRichard.jpg',
        code_link: 'http://www.amazon.cn/%E7%A9%B7%E7%90%86%E6%9F%A5%E6%99%BA%E6%85%A7%E4%B9%A6-%E6%9C%AC%E6%9D%B0%E6%98%8E%E2%80%A2%E5%AF%8C%E5%85%B0%E5%85%8B%E6%9E%97/dp/B00DGJ6S9O/ref=sr_1_2?s=books&ie=UTF8&qid=1455418672&sr=1-2',
        title: '穷理查智慧书(中英对照)',
        core_tech: '生活',
        description: '<font color="#FF8000">书中的《财富之路》章节被公认为投资致富的经典，被列入哈佛商学院、沃顿商学院MBA推荐书目，美国各大公司和金融机构奉若圭臬。</font>'
    }, {
        demo_link: 'http://item.jd.com/11461683.html',
        img_link: '/files/books/python2ndEdition.jpg',
        code_link: 'http://item.jd.com/11461683.html',
        title: 'Python基础教程（第2版 修订版）',
        core_tech: '编程',
        description: '<font color="#FF8000">Python入门佳作 经典教程。2016年学习的语言之一</font>'
    }, {
        demo_link: 'http://item.jd.com/11785168.html',
        img_link: '/files/books/bigdata_internet.jpg',
        code_link: 'http://item.jd.com/11785168.html',
        title: '《大数据的互联网思维》',
        core_tech: '大数据的互联网思维》',
        description: '<font color="#CC2D00">100多亿元买来的15年大数据产品及运营实战经验。抽点时间了解下。</font>'
    }];

    contentInit(demoContent) //内容初始化
    waitImgsLoad() //等待图片加载，并执行布局初始化
}());



/**
 * 内容初始化
 * @return {[type]} [description]
 */
function contentInit(content) {
    // var htmlArr = [];
    // for (var i = 0; i < content.length; i++) {
    //     htmlArr.push('<div class="grid-item">')
    //     htmlArr.push('<a class="a-img" href="'+content[i].demo_link+'">')
    //     htmlArr.push('<img src="'+content[i].img_link+'">')
    //     htmlArr.push('</a>')
    //     htmlArr.push('<h3 class="demo-title">')
    //     htmlArr.push('<a href="'+content[i].demo_link+'">'+content[i].title+'</a>')
    //     htmlArr.push('</h3>')
    //     htmlArr.push('<p>主要技术：'+content[i].core_tech+'</p>')
    //     htmlArr.push('<p>'+content[i].description)
    //     htmlArr.push('<a href="'+content[i].code_link+'">源代码 <i class="fa fa-code" aria-hidden="true"></i></a>')
    //     htmlArr.push('</p>')
    //     htmlArr.push('</div>')
    // }
    // var htmlStr = htmlArr.join('')
    var htmlStr = ''
    for (var i = 0; i < content.length; i++) {
        htmlStr +=
            '<div class="grid-item">' +
            '   <a class="a-img" href="' + content[i].demo_link + '">' +
            '       <img src="' + content[i].img_link + '">' +
            '   </a>' +
            '   <h3 class="demo-title">' +
            '       <a href="' + content[i].demo_link + '">' + content[i].title + '</a>' +
            '   </h3>' +
 //           '   <p>主要技术：' + content[i].core_tech + '</p>' +
            '   <p>类别：' + content[i].core_tech + '</p>' +
            '   <p>' + content[i].description +
//            '       <a href="' + content[i].code_link + '">源代码 <i class="fa fa-code" aria-hidden="true"></i></a>' +
            '   </p>' +
            '</div>'
    }
    var grid = document.querySelector('.grid')
    grid.insertAdjacentHTML('afterbegin', htmlStr)
}

/**
 * 等待图片加载
 * @return {[type]} [description]
 */
function waitImgsLoad() {
    var imgs = document.querySelectorAll('.grid img')
    var totalImgs = imgs.length
    var count = 0
        //console.log(imgs)
    for (var i = 0; i < totalImgs; i++) {
        if (imgs[i].complete) {
            //console.log('complete');
            count++
        } else {
            imgs[i].onload = function() {
                // alert('onload')
                count++
                //console.log('onload' + count)
                if (count == totalImgs) {
                    //console.log('onload---bbbbbbbb')
                    initGrid()
                }
            }
        }
    }
    if (count == totalImgs) {
        //console.log('---bbbbbbbb')
        initGrid()
    }
}

/**
 * 初始化栅格布局
 * @return {[type]} [description]
 */
function initGrid() {
    var msnry = new Masonry('.grid', {
        // options
        itemSelector: '.grid-item',
        columnWidth: 250,
        isFitWidth: true,
        gutter: 20,
    })
}
