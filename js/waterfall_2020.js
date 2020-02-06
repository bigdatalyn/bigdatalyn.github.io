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
        },{
        demo_link: 'http://www.amazon.cn/Hadoop%E7%A1%AC%E5%AE%9E%E6%88%98-%E4%BA%9A%E5%8E%86%E5%85%8B%E6%96%AF%C2%B7%E9%9C%8D%E5%A7%86%E6%96%AF/dp/B00RFY9DES/ref=sr_1_1?s=books&ie=UTF8&qid=1455504927&sr=1-1',
        img_link: '/files/books/HadoopInPraction-SecondEditon.png',
        code_link: 'http://www.amazon.cn/Hadoop%E7%A1%AC%E5%AE%9E%E6%88%98-%E4%BA%9A%E5%8E%86%E5%85%8B%E6%96%AF%C2%B7%E9%9C%8D%E5%A7%86%E6%96%AF/dp/B00RFY9DES/ref=sr_1_1?s=books&ie=UTF8&qid=1455504927&sr=1-1',
        title: 'Manning.Hadoop.in.Practice.2nd.Edition',
        core_tech: '大数据',
        description: '<font color="#1166CC">《Hadoop硬实战》收集了85个问题场景以及解决方案的实战演练。在关键问题领域对基础概念和实战方法做了权衡，例如导入导出、序列化，以及LZO压缩。你将会学习到每个技术的细节，以及当遇到一个具体问题时能够给出对应的解决方案。</font>'
    }, {
        demo_link: 'http://www.amazon.cn/%E7%AE%97%E6%B3%95%E5%AF%BC%E8%AE%BA-Thomas-H-Cormen/dp/B00AK7BYJY/ref=sr_1_1?ie=UTF8&qid=1455416307&sr=8-1&keywords=%E7%AE%97%E6%B3%95%E5%AF%BC%E8%AE%BA%EF%BC%88%E5%8E%9F%E4%B9%A6%E7%AC%AC3%E7%89%88%EF%BC%89',
        img_link: '/files/books/algorithms.jpg',
        code_link: 'http://www.amazon.cn/%E7%AE%97%E6%B3%95%E5%AF%BC%E8%AE%BA-Thomas-H-Cormen/dp/B00AK7BYJY/ref=sr_1_1?ie=UTF8&qid=1455416307&sr=8-1&keywords=%E7%AE%97%E6%B3%95%E5%AF%BC%E8%AE%BA%EF%BC%88%E5%8E%9F%E4%B9%A6%E7%AC%AC3%E7%89%88%EF%BC%89',
        title: '算法导论',
        core_tech: '编程',
        description: '<font color="#FF8000">本书将严谨性和全面性融为一体，深入讨论各类算法，并着力使这些算法的设计和分析能为各个层次的读者接受。全书各章自成体系，可以作为独立的学习单元；算法以英语和伪代码的形式描述，具备初步程序设计经验的人就能看懂；说明和解释力求浅显易懂，不失深度和数学严谨性。</font>'
    }, {
        demo_link: 'http://www.amazon.cn/DB2%E6%95%B0%E6%8D%AE%E5%BA%93%E6%80%A7%E8%83%BD%E8%B0%83%E6%95%B4%E5%92%8C%E4%BC%98%E5%8C%96-%E7%89%9B%E6%96%B0%E5%BA%84/dp/B00DVYDQBC/ref=sr_1_1?ie=UTF8&qid=1455416781&sr=8-1&keywords=DB2',
        img_link: '/files/books/DB2Tuning.jpg',
        code_link: 'http://www.amazon.cn/DB2%E6%95%B0%E6%8D%AE%E5%BA%93%E6%80%A7%E8%83%BD%E8%B0%83%E6%95%B4%E5%92%8C%E4%BC%98%E5%8C%96-%E7%89%9B%E6%96%B0%E5%BA%84/dp/B00DVYDQBC/ref=sr_1_1?ie=UTF8&qid=1455416781&sr=8-1&keywords=DB2',
        title: 'DB2数据库性能调整和优化(第2版)',
        core_tech: '数据库',
        description: '<font color="#BB3D00">国内最权威的DB2图书“三部曲”，DB2从业人员的案头书</font>'
    }, {
        demo_link: 'http://item.jd.com/11144224.html',
        img_link: '/files/books/RinAction.jpg',
        code_link: 'http://item.jd.com/11144224.html',
        title: '《 R语言实战 [R in Action:Data Analysis and] 》',
        core_tech: '大数据',
        description: 'font color="#FF8000">R的入门实战书籍，2016年重要学习方向。</font>'
    }, {
        demo_link: 'http://www.amazon.cn/DB2%E6%80%A7%E8%83%BD%E7%AE%A1%E7%90%86%E4%B8%8E%E5%AE%9E%E6%88%98-IBM%E4%B8%AD%E5%9B%BD%E5%BC%80%E5%8F%91%E4%B8%AD%E5%BF%83-%E4%BF%A1%E6%81%AF%E7%AE%A1%E7%90%86%E8%BD%AF%E4%BB%B6%E5%BC%80%E5%8F%91%E9%83%A8/dp/B00LW89LTK/ref=sr_1_1?s=books&ie=UTF8&qid=1455417093&sr=1-1',
        img_link: '/files/books/DB2PerfManage.jpg',
        code_link: 'http://www.amazon.cn/DB2%E6%80%A7%E8%83%BD%E7%AE%A1%E7%90%86%E4%B8%8E%E5%AE%9E%E6%88%98-IBM%E4%B8%AD%E5%9B%BD%E5%BC%80%E5%8F%91%E4%B8%AD%E5%BF%83-%E4%BF%A1%E6%81%AF%E7%AE%A1%E7%90%86%E8%BD%AF%E4%BB%B6%E5%BC%80%E5%8F%91%E9%83%A8/dp/B00LW89LTK/ref=sr_1_1?s=books&ie=UTF8&qid=1455417093&sr=1-1',
        title: 'DB2性能管理与实战',
        core_tech: '数据库',
        description: '<font color="#AE57A4">《DB2性能管理与实战》围绕着OPM和OWQT这两个工具的使用方法和技巧展开介绍，并在各种实战案例的基础之上，总结了OPM和OQWT的各种新特性和功能。</font>'
    }, {
        demo_link: 'http://www.amazon.cn/Oracle-Database-9i-10g-11g%E7%BC%96%E7%A8%8B%E8%89%BA%E6%9C%AF-%E6%B7%B1%E5%85%A5%E6%95%B0%E6%8D%AE%E5%BA%93%E4%BD%93%E7%B3%BB%E7%BB%93%E6%9E%84-%E5%87%AF%E7%89%B9/dp/B004I91HDI/ref=sr_1_1?s=books&ie=UTF8&qid=1455417615&sr=1-1',
        img_link: '/files/books/OracleArt.jpg',
        code_link: 'http://www.amazon.cn/Oracle-Database-9i-10g-11g%E7%BC%96%E7%A8%8B%E8%89%BA%E6%9C%AF-%E6%B7%B1%E5%85%A5%E6%95%B0%E6%8D%AE%E5%BA%93%E4%BD%93%E7%B3%BB%E7%BB%93%E6%9E%84-%E5%87%AF%E7%89%B9/dp/B004I91HDI/ref=sr_1_1?s=books&ie=UTF8&qid=1455417615&sr=1-1',
        title: 'Oracle Database 9i/10g/11g编程艺术:深入数据库体系结构(第2版)',
        core_tech: '数据库',
        description: '<font color="#AE57A4">涵盖了所有重要的Oracle体系结构特性，重温Thomas Kyte大作</font>'
    }, {
        demo_link: 'http://www.amazon.cn/Hadoop%E6%9D%83%E5%A8%81%E6%8C%87%E5%8D%97-%E6%80%80%E7%89%B9/dp/B016OFNZYM/ref=sr_1_2?s=books&ie=UTF8&qid=1455504816&sr=1-2',
        img_link: '/files/books/HadoopGuid_V4.png',
        code_link: 'http://www.amazon.cn/Hadoop%E6%9D%83%E5%A8%81%E6%8C%87%E5%8D%97-%E6%80%80%E7%89%B9/dp/B016OFNZYM/ref=sr_1_2?s=books&ie=UTF8&qid=1455504816&sr=1-2',
        title: 'OReilly.Hadoop.The.Definitive.Guide.4th.Edition',
        core_tech: '大数据',
        description: '<font color="#FF8000">作者：（美国）怀特（Tom White）怀特（Tom White） Tom White是Cloudera的工程师和Apache软件基金会的成员，从2007年起就是Apache Hadoop的代码提交者。他在oreilly.com、java.net和IBM的developerWorks写了大量文章，并且经常在产业大会上作关于Hadoop的演讲。 </font>'
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
