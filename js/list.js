var index_js=(function(){
    var $ul=$('.tbox');
    var shopList=localStorage.shopList||'[]';
    shopList=JSON.parse(shopList);
    return {
        init:function(){
            this.events();
            this.getData();

        },
        getData:function(){
            $.get('json/shop.json',this.insertData,'json');
        },
        insertData:function(data){
            var str='';
            for(var i=0;i<data.length;i++){
                var li=`<tr id='${data[i].id}'><td>${data[i].name}</td><td>${data[i].price}</td><td><input type='number' value='1'/></td><td><button class='btn btn-danger'>添加到购物车</button></td></tr>`;
                str+=li;

            }
            $ul.html(str);
        },
        addShop:function(obj){
            var flag=true;
            //var shopList=localStorage.shopList||'[]';
            //shopList=JSON.parse(shopList);
            for(var i=0;i<shopList.length;i++){
                if(obj.id==shopList[i].id){
                    flag=false;
                    shopList[i].count+=obj.count;
                    break;
                }
            }
            if(flag){
                shopList.push(obj);
            }
            localStorage.shopList=JSON.stringify(shopList);
        },
        events:function(){
            var _this=this;
           
            $ul.on('click','.btn',function(){
                var tr=$(this).closest('tr');
                var tdAll=tr.children('td');
                var obj={
                    id:tr.attr('id'),
                    count:Number(tdAll.find('input').val()),
                    name:tdAll.eq(0).html(),
                    price:tdAll.eq(1).html()
                }
                _this.addShop(obj);
            })
            
        }
    }
}())
index_js.init();