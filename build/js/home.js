var isRefresh = false

request({
    type: "post",
    url: "/api/command/list",
    data: {},
    dataType: "json",
    success: function (response) {
        if (response.status == 0 && response.fileList && response.fileList.length > 0) {
            let list = `
            ${response.fileList.map(item => {
                return `
                    <td>${item}</td>
                    <td>
                        <a type="button" class="btn btn-primary ex" data-name=${item} href="javascript:;">执行</a>
                        <a type="button" class="btn btn-primary view" data-name=${item} href="javascript:;">查看sh</a>
                        <a type="button" class="btn btn-primary log" data-name=${item} href="javascript:;">查看log</a>
                    </td>
                `
            })}
            `
            $('#table-body').append(list)
        }
    }
});

$('#table-body').on('click', '.ex', function() {
    let item = $(this).data('name')
    request({
        type: "post",
        url: "/api/command/execute",
        data: {name: item},
        dataType: "json",
        success(res) {
            if (res.status == 0) {
                isRefresh = item
                viewLog(isRefresh)
                $('#showLogs').modal('toggle')
            } else {
                alert('执行失败')
            }
        }
    })
})

var viewLog = (name) => {
    if (!isRefresh) return
    request({
        type: "post",
        url: "/api/command/getLog",
        data: {name},
        dataType: "json",
        success(res) {
            if (res.status == 0) {
                $('#showLogs .log pre').html(res.content)
                setTimeout(() => {
                    var scrollHeight = $('#showLogs .log pre').prop("scrollHeight");
                    $('#showLogs .log pre').scrollTop(scrollHeight,200);
                }, 200)                
                if (isRefresh == name) {
                    setTimeout(() => {
                        viewLog(name)
                    }, 5000)
                } else {

                }
            } else {
                alert('查看失败')
            }
        }
    })
}

$('#table-body').on('click', '.view', function() {
    let item = $(this).data('name')
    request({
        type: "post",
        url: "/api/command/getDetails",
        data: {name: item},
        dataType: "json",
        success(res) {
            if (res.status == 0) {
                $('#showDetails pre').html(res.content)
                $('#showDetails').modal('toggle')
            } else {
                alert('执行失败')
            }
        }
    })
    
})

$('#table-body').on('click', '.log', function() {
    isRefresh = $(this).data('name')
    viewLog(isRefresh)
    $('#showLogs').modal('toggle')
})

$('#showLogs').on('hide.bs.modal', function() {
    isRefresh = false
})

$('.log-clear').on('click', () => {
    request({
        type: "post",
        url: "/api/command/clear",
        data: {name: isRefresh},
        dataType: "json",
        success(res) {
            if (res.status == 0) {
                $('#showLogs .log pre').html('')
            } else {
                alert('执行失败')
            }
        }
    })
})