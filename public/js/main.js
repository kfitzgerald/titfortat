window.tit = tit = {
    intit:function(){

        this.socket = socket = io.connect('http://localhost');
        this.socket.on('account.create', function (data) {
            console.log(data);
        });
        this.account = 1;//        'ass';//Fake it till you make it

    },
    db:function(model, action, data){
        this.socket.emit('db', {
            model:model,
            action:action,
            data:data
        });
    },
    init_account:function(){
        $('.btn-save-address').click(function(){
            var jColl = $('#txt-address');
            for(var i = 0; i < jColl.length; i++){
                var jEle = $(jColl[i]);
                tit.db('address', 'create', {
                    account_id:this.account,
                    type:jEle.attr('data-type'),
                    hash:jEle.val()
                })
            }
        });
    },
    init_orders:function(){

       this.socket.on('order.get_by_account', function(orders){
            tit.render_orders(orders);
       })
       this.db('order', 'get_by_account', this.account);
    },
    render_orders:function(orders){
        var jBuyEle = $('#buy-orders');
        var jSellEle = $('#sell-orders');
        jBuyEle.empty();
        jSellEle.empty();
        for(var i in orders){
            console.log(orders[i]);
            var html = '<li><a class="list-group-item">' + orders[i].amount + ' - ' + orders[i].rate + '</a></li>';
            if(orders[i].type == "BUY"){
                jBuyEle.append(html);
            }else{
                jSellEle.append(html);
            }
        }
    }
}
$(function(){
    tit.intit();
    tit.init_orders();
})