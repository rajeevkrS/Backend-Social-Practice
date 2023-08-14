//function which send the data to post controller action
{
    // Method to submit the form data for new post using AJAX
    let createPost = function(){
        let newPostForm = $('#new-post-form');

        //whenever this form is submitted I dont want it to submit naturally, So we do "preventDefault()"
        newPostForm.submit(function(e){
            e.preventDefault();

            //manually submitting using ajax
            $.ajax({
                type: 'post',
                url: '/posts/create',
                //sending the data for creating the post using "serialize()" : this converts the form data into "json"
                data: newPostForm.serialize(),
                success: function(data){

                    // console.log(data);

                    //calls the newPostDom function
                    let newPost = newPostDom(data.data.post);

                    //appending the list to "post-list-container"(home.ejs)
                    $('#post-list-container>ul').prepend(newPost); //prepend() putting at the first position

                    //"newPost" object has this class inside it now
                    deletePost($(' .delete-post-button', newPost));

                    // call the create comment class
                    new PostComments(data.data.post._id);

                    // Display a success flash notification
                    new Noty({
                        theme: 'relax',
                        type: 'success',
                        layout: 'topRight',
                        text: 'Post created successfully!',
                        timeout: 3000 // Duration for which the notification will be displayed
                    }).show();
                    
                },
                 error: function(error){
                    console.log(error.responseText);
                }
            });
        });
    }


    // Method to create a post in DOM
    let newPostDom = function(post){
        return $(` 

        <li id="post-${post._id}">
            <p>
                <small class="delete-button">
                    <a href="/posts/destroy/${post._id}" class="delete-post-button">X</a>
                </small>

                ${post.content}
                <small class="username">
                    ${post.user.name}
                </small>
            </p>

            <div class="post-comment">

                <form id="post-${ post._id }-comments-form" action="/comments/create" method="POST">

                    <input type="text" name="content" placeholder="Type Here..." required>

                    <input type="hidden" name="post" value="${post._id}">
                    
                    <input type="submit" value="Add Comment">

                </form> 

                <div class="post-comments-list">

                    <ul id = "post-comments-${post._id}"></ul>

                </div>

            </div>

        </li>

        `)
    }




    //Method to delete the post from DOM: this is the function which sending the ajax request
    let deletePost = function(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();

            $.ajax({
                type: 'get',
                //get delete-button(X) link "href" via prop() 
                url: $(deleteLink).prop('href'),
                success: function(data){

                    $(`#post-${data.data.post_id}`).remove();

                    // Display a success flash notification
                    new Noty({
                        theme: 'relax',
                        type: 'success',
                        layout: 'topRight',
                        text: 'Post Deleted successfully!',
                        timeout: 3000 // Duration for which the notification will be displayed
                    }).show();

                },
                error: function(error){
                    console.log(error.responseText);
                }
            });
        });
    }


    // loop over all the existing posts on the page (when the window loads for the first time) and call the delete post method on delete link of each, also add AJAX (using the class we've created) to the delete button of each
    let convertPostsToAjax = function(){
        $('#posts-list-container>ul>li').each(function(){
            let self = $(this);
            let deleteButton = $(' .delete-post-button', self);
            deletePost(deleteButton);

            // get the post's id by splitting the id attribute
            let postId = self.prop('id').split("-")[1]
            new PostComments(postId);
        });
    }



    createPost();
    convertPostsToAjax();
}



// Summary:

// We created inside assest's js file, which sent the form via AJAX, using "peventDefault()" prevented the default behaviour of the form to get submitted and then we sent the data to the server via AJAX parallelly(asynchronous).
// And on the server side we use "req.xhr" and we checked whether an req. was XMLHttp req. or not which is an AJAX req., if it was we sent back data into "json form".
// And once we sent back data into json form, so we created a function which display that data. Then 👇

// Delete:

// We create another function which sends the delete req. by AJAX and then the req. give a successfull response, we  deleted that elememt from the DOM.

// Created a function which sends post id to be deleted
    // using "peventDefault()" blocks the natural behaviour of delete link and sends via ajax parallelly.
    // when it sends it, it recieves some data with "post_id"
// After that populated this deleteLink { deletePost($(' .delete-post-button', newPost)); }