$( document ).ready( async function() {

    var categories = {};
    var posts = [];
    await $.ajax({
        url: 'http://www.mocky.io/v2/5c43503a3800006f00072e08',
        type: "GET",
        success: function(result) {
            // console.log( result.categories );
            for ( let i = 0; i < result.categories.length; i++ ) {
                categories[result.categories[i].id] = result.categories[i];
                $('#category').append( '<option value="' + result.categories[i].id + '">' + result.categories[i].title + '</option>' );
            }

        },
        error: function(error) {
            console.log( error );
        }
    });
    // console.log( categories );

    await $.ajax({
        url: 'http://www.mocky.io/v2/5c4350a23800004c00072e0a',
        type: "GET",
        success: function(result) {
            console.log( result.posts );
            posts = result.posts;            
            appendPostsInTable( posts );            
        },
        error: function(error) {
            console.log( error );
        }
    });

    function appendPostsInTable( posts, filterByCategoryID = null ) {
        $('#posts div').remove();
        for ( let i = 0; i < posts.length; i++ ) {

            let post = posts[i];
            if ( filterByCategoryID === null || filterByCategoryID == categories[post.category].id ) {
            
                let row = 
                    '<div class="article">' +
                        '<div class="main">' +
                            '<p>Post ID:' + post.id + '</p>' +
                            '<p>User ID:' + post.user_id + '</p>' +
                            '<p>Published Date: ' + post.published_at + '</p>' +
                            '<img src="' + post.image + '" alt="' + post.image + '" />' +
                        '</div>' +
                        '<div class="description">' +
                            '<h2>Category: ' + categories[post.category].title + '</h2>' +
                            '<h3>Title: ' + post.title + '</h3>' +
                            '<p>Description:' + post.description + '</p>' +
                        '</div>' +
                        '<div class="clear"></div>' +
                    '</div>';


                    // '<tr>' + 
                    //     '<td>' + post.id + '</td>' +
                    //     '<td>' + post.user_id + '</td>' +
                    //     '<td><img src="' + post.image + '" alt="' + post.image + '" /></td>' +
                    //     '<td>' + post.title + '</td>' +
                    //     '<td>' + post.published_at + '</td>' +
                    //     '<td>' + post.description + '</td>' +
                    //     '<td>' + categories[post.category].title + '</td>' +
                    // '</tr>';

                // console.log( row );            
                $('#posts').append( row );

            }

        }
    }

    $('.date').on('click', function() {
        if ( $(this).find('.arrow-icon').hasClass('rotate180') ) {
            $(this).find('.arrow-icon').removeClass('rotate180');
            posts.sort(
                function(a, b) {
                    return new Date(a.published_at) - new Date(b.published_at)
                }
            );
            appendPostsInTable( posts );  
        } else {
            $(this).find('.arrow-icon').addClass('rotate180');
            posts.sort(
                function(a, b) {
                    return new Date(b.published_at) - new Date(a.published_at)
                }
            );
            appendPostsInTable( posts ); 
        }
    });

    $('.category').on('click', function() {
        if ( $(this).find('.arrow-icon').hasClass('rotate180') ) {
            $(this).find('.arrow-icon').removeClass('rotate180');
            posts.sort(
                function(a, b) {
                    return a.category - b.category
                }
            );
            appendPostsInTable( posts ); 
        } else {
            $(this).find('.arrow-icon').addClass('rotate180');
            posts.sort(
                function(a, b) {
                    return b.category - a.category
                }
            );
            appendPostsInTable( posts ); 
        }
    });

    $('.post-id').on('click', function() {
        if ( $(this).find('.arrow-icon').hasClass('rotate180') ) {
            $(this).find('.arrow-icon').removeClass('rotate180');
            posts.sort(
                function(a, b) {
                    return a.id - b.id
                }
            );
            appendPostsInTable( posts ); 
        } else {
            $(this).find('.arrow-icon').addClass('rotate180');
            posts.sort(
                function(a, b) {
                    return b.id - a.id
                }
            );
            appendPostsInTable( posts ); 
        }
    });

    $('#category').on('change', function() {
        if ( $(this).val() > 0 ) {
            appendPostsInTable( posts, $(this).val() );
        }
    });

    $('.all-category').on('click', function() {
        $('#category').val(0);
        appendPostsInTable( posts );
    });
});