window.tit = tit = {
    intit:function(){

        this.socket = socket = io.connect('http://localhost');
        this.socket.on('account.create', function (data) {
            console.log(data);
        });

    },
    db:function(model, action, data){
        this.socket.emit('db', {
            model:model,
            action:action,
            data:data
        });
    }
}
$(function(){
    tit.intit();
})