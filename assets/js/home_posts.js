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

                    // Display a success flash notification
                    new Noty({
                        type: 'success',
                        layout: 'topRight',
                        text: 'Post created successfully!',
                        timeout: 3000 // Duration for which the notification will be displayed
                    }).show();
                    
                },
                 error: function(error){
                    console.log(error.responseText);

                    // Display an error flash notification
                    new Noty({
                        type: 'error',
                        layout: 'topRight',
                        text: 'An error occurred. Please try again.',
                        timeout: 3000
                    }).show();
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

                <form action="/comments/create" method="POST">

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
                        type: 'success',
                        layout: 'topRight',
                        text: 'Post Deleted successfully!',
                        timeout: 3000 // Duration for which the notification will be displayed
                    }).show();

                },
                error: function(error){
                    console.log(error.responseText);

                    // Display an error flash notification
                    new Noty({
                        type: 'error',
                        layout: 'topRight',
                        text: 'An error occurred. Please try again.',
                        timeout: 3000
                    }).show();

                }
            });
        });
    }





    createPost();
}

// Delete:

// Created a function which sends post id to be deleted
    //blocks the natural behaviour of delete link and sends via ajax parallelly.
    // when it sends it, it recieves some data with "post_id"
// After that populated this deleteLink { deletePost($(' .delete-post-button', newPost)); }