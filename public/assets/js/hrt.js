/**
 * Created by Crimson on 2015/3/25.
 */

function doEdit(elem){
    var tr = elem.parent().parent();
    var tro = [
        tr.children()[0],
        tr.children()[1],
        tr.children()[2],
        tr.children()[3],
        tr.children()[4]
    ];
    tro.forEach(function(td){
        var ntd = $(td);
        var msg = ntd.html();
        ntd.html('<input type="text" placeholder="Write here">');
        setTimeout(function(){
            $(ntd.children()[0]).val(msg);
        }, 0);
    });
    var operations = $(tr.children()[5]);
    $(operations.children()[0]).css('display', 'none');
    $(operations.children()[1]).removeAttr('style');
    $(operations.children()[2]).css('display', 'none');
}

function doSave(elem){
    var tr = elem.parent().parent();
    var tro = [
        tr.children()[0],
        tr.children()[1],
        tr.children()[2],
        tr.children()[3],
        tr.children()[4]
    ];
    var njson = [ $(tr).attr('uid') ];
    tro.forEach(function(td){
        var ntd = $(td);
        var msg = $(ntd.children()[0]).val();
        njson.push(msg);
        ntd.html(msg);
    });
    var operations = $(tr.children()[5]);
    $(operations.children()[1]).css('display', 'none');
    $(operations.children()[0]).removeAttr('style');
    $(operations.children()[2]).removeAttr('style');
    $.ajax({
        type : 'get',
        url : './saveinfo',
        data : {
            uid : njson[0],
            na : njson[1],
            rp : njson[2],
            op : njson[3],
            mp : njson[4],
            ma : njson[5]
        },
        dataType:'json',
        success : function(datas){
            var data = datas[0];
            var node = $(elem.parent().parent());
            node.attr('uid', data.uid);
            node.html('');
            node.html(
            ' <td>' + data.na + '</td> ' +
            '<td>' + data.rp + '</td> ' +
            '<td>' + data.op + '</td> ' +
            '<td>' + data.mp + '</td> ' +
            '<td>' + data.ma + '</td> ' +
            '<td> ' +
            '<button class="btn btn-minier btn-primary center" onclick="doEdit($(this))">Edit</button> ' +
            '<button class="btn btn-minier btn-primary center" onclick="doSave($(this))" style="display: none">Save</button> ' +
            '<button class="btn btn-minier btn-danger center" onclick="doDelete($(this))">Delete</button> </td> '
            );
        },
        error : function(){
            takeERR();
        }
    });
}

function doDelete(elem){
    $.ajax({
        type : 'get',
        url : './deleteinfo',
        data : {
            uid : $(elem.parent().parent()).attr('uid')
        },
        dataType:'json',
        success : function(datas){

        },
        error : function(){
            takeERR();
        }
    });
    var tr = $(elem.parent().parent()).remove();
}

function doAdd(elem){
    var parent = $(elem.parent());
    $(parent.children()[0]).removeAttr('style');
    $(parent.children()[2]).removeAttr('style');
    elem.remove();
    doEdit($(parent.children()[0]));
    var node = $(' <tr uid="-1"> <td></td> <td></td> <td></td> <td></td> <td></td> <td> ' +
    '<button class="btn btn-minier btn-primary center" onclick="doEdit($(this))" style="display: none">Edit</button> ' +
    '<button class="btn btn-minier btn-primary center" onclick="doSave($(this))" style="display: none">Save</button> ' +
    '<button class="btn btn-minier btn-danger center" onclick="doDelete($(this))" style="display: none">Delete</button> ' +
    '<button class="btn btn-minier btn-primary center" onclick="doAdd($(this))">Add</button> </td> </tr>');
    node.appendTo(parent.parent().parent());
}

function doSearch(type, word){
    $.ajax({
        type : 'get',
        url : './searchinfo',
        dataType:'json',
        data : {
            type : type.val(),
            word : word.val()
        },
        success : function(datas){
            var node = $('#unode');
            node.html('');
            datas.forEach(function(data){
                node.html(node.html() + ' <tr uid="' + data.uid + '">' +
                ' <td>' + data.na + '</td> ' +
                '<td>' + data.rp + '</td> ' +
                '<td>' + data.op + '</td> ' +
                '<td>' + data.mp + '</td> ' +
                '<td>' + data.ma + '</td> ' +
                '<td> ' +
                '<button class="btn btn-minier btn-primary center" onclick="doEdit($(this))">Edit</button> ' +
                '<button class="btn btn-minier btn-primary center" onclick="doSave($(this))" style="display: none">Save</button> ' +
                '<button class="btn btn-minier btn-danger center" onclick="doDelete($(this))">Delete</button> </td> ' +
                '</tr>');
            });
            node.html(node.html() + ' <tr uid="-1"> <td></td> <td></td> <td></td> <td></td> <td></td> <td> ' +
            '<button class="btn btn-minier btn-primary center" onclick="doEdit($(this))" style="display: none">Edit</button> ' +
            '<button class="btn btn-minier btn-primary center" onclick="doSave($(this))" style="display: none">Save</button> ' +
            '<button class="btn btn-minier btn-danger center" onclick="doDelete($(this))" style="display: none">Delete</button> ' +
            '<button class="btn btn-minier btn-primary center" onclick="doAdd($(this))">Add</button> </td> </tr>');
        },
        error : function(){
            takeERR();
        }
    });
}

function layResult(){
    $.ajax({
        type : 'get',
        url : './getallinfoes',
        dataType:'json',
        success : function(datas){
            var node = $('#unode');
            node.html('');
            datas.forEach(function(data){
                node.html(node.html() + ' <tr uid="' + data.uid + '">' +
                ' <td>' + data.na + '</td> ' +
                '<td>' + data.rp + '</td> ' +
                '<td>' + data.op + '</td> ' +
                '<td>' + data.mp + '</td> ' +
                '<td>' + data.ma + '</td> ' +
                '<td> ' +
                '<button class="btn btn-minier btn-primary center" onclick="doEdit($(this))">Edit</button> ' +
                '<button class="btn btn-minier btn-primary center" onclick="doSave($(this))" style="display: none">Save</button> ' +
                '<button class="btn btn-minier btn-danger center" onclick="doDelete($(this))">Delete</button> </td> ' +
                '</tr>');
            });
            node.html(node.html() + ' <tr uid="-1"> <td></td> <td></td> <td></td> <td></td> <td></td> <td> ' +
            '<button class="btn btn-minier btn-primary center" onclick="doEdit($(this))" style="display: none">Edit</button> ' +
            '<button class="btn btn-minier btn-primary center" onclick="doSave($(this))" style="display: none">Save</button> ' +
            '<button class="btn btn-minier btn-danger center" onclick="doDelete($(this))" style="display: none">Delete</button> ' +
            '<button class="btn btn-minier btn-primary center" onclick="doAdd($(this))">Add</button> </td> </tr>');
        },
        error : function(){
            takeERR();
        }
    });
}

function takeERR(){
    $('#errholder').prepend('<div class="alert alert-danger"> <button type="button" class="close" data-dismiss="alert"> <i class="icon-remove"></i> </button>' +
    ' <strong> <i class="icon-remove"></i>Oh snap! </strong>Something is wrong. <br> </div>')
}

layResult();