$(function(){
    var repo = "olton/Core_CSS";

    $.ajax({
        url: 'https://api.github.com/repos/' + repo,
        dataType: 'jsonp',

        error: function(result){

        },
        success: function(results){
            var repo = results.data;

            $("#github-stars").html(repo.stargazers_count);
            $("#github-forks").html(repo.forks_count);
        }
    })
});