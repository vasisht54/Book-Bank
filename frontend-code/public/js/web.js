$(document).ready(function () {
  const apiServer = "http://localhost:5000";

  $("#userDelete").on("submit", event => {
    event.preventDefault();
    $.ajax({
      url: apiServer + "/user/deleteUser",
      type: "DELETE",
      contentType: "application/json",
      data: JSON.stringify({
        username: $(event.currentTarget)
          .find("[name=username]")
          .val()
      }),
      success: data => {
        alert(data.message);
        location.reload();

      }
    });
  });

  //Add to Cart
  $("#addToCart").on("submit", e => {
    e.preventDefault();

    const bookTitle = $(e.currentTarget).find("[name=bookTitle]").val();
    const username = $(e.currentTarget).find("[name=username]").val();
    // alert("Info");
    // alert(bookTitle);
    // alert(username);
    $.ajax({
      url: apiServer + "/book/booksByTitle?q=" + bookTitle,
      method: "GET",
      contentType: "application/json",
      success: data => {
        // alert("LL");
        // alert(data[0].seller);
        $.ajax({
          url: apiServer + "/user/id?q=" + data[0].seller,
          method: "GET",
          contentType: "application/json",
          success: data1 => {
            // alert(data1[0].username);
            // alert(bookTitle);
            // alert(username);
           
            $.ajax({
              url: apiServer + "/cart/addToCart",
              method: "POST",
              contentType: "application/json",
             
              data: JSON.stringify({
                book: bookTitle,
                buyer: username,
                quantity: 1,
                seller: data1[0].username
              }),
              success: data => {
                alert(data.status);
                location.reload();

              }
            })

          }

        })

      }

    })

  });

  //Empty Cart
  $("#clearCart").on("submit", e => {
    e.preventDefault();

    const username = $(e.currentTarget).find("[name=username]").val();


    $.ajax({
      url: apiServer + "/cart/clearCart?q=" + username,
      method: "DELETE",
      contentType: "application/json",
      success: data => {
        alert(data.status);
        location.reload();

      }
    });
  });

  //Delete Item From Cart
  $("#deleteItemFromCart").on("submit", e => {
    e.preventDefault();

    const username = $(e.currentTarget).find("[name=username]").val();
    const title = $(e.currentTarget).find("[name=title]").val();

    // alert(username);
    // alert(title);

    $.ajax({
      url: apiServer + "/cart/deleteBooksFromCart",
      method: "DELETE",
      contentType: "application/json",
      data: JSON.stringify({ buyer: username, book: title }),
      success: data => {
        alert(data.status);
        location.reload();

      }
    });
  });


  //Delete Order By ID
  $("#deleteOrderByIDSeller").on("submit", e => {
    e.preventDefault();

    const id = $(e.currentTarget).find("[name=orderId]").val();
    // alert(id);

    // alert("ABC");
    // alert(id);

    $.ajax({
      url: apiServer + "/order/deleteOrderById?q=" + id,
      method: "DELETE",
      contentType: "application/json",
      success: data => {
        alert(data.status);
        location.reload();

      }
    });
  });

  //Add to Order From Cart
  $("#addToOrders").on("submit", e => {
    e.preventDefault();


    const username = $(e.currentTarget).find("[name=username]").val();
    // const book = $(e.currentTarget).find("[name=book]").val();
    // const quantity = $(e.currentTarget).find("[name=quantity]").val();

    // alert(cart[0].buyer);
    // alert(book); 
    // alert(quantity);
    // alert(username);

    $.ajax({
      url: apiServer + "/cart/getUserCart?q=" + username,
      method: "GET",
      contentType: "application/json",
      success: data => {
        // alert(data[1].book);
        data.forEach(element => {
          // alert(element.book);
          // alert(element.buyer);
          // alert(element.quantity);
          $.ajax({
            url: apiServer + "/order/addToOrder",
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify({
              buyer: element.buyer,
              book: element.book,
              quantity: element.quantity,
              seller : element.seller
            }),
            success: data => {
              $.ajax({
                url: apiServer + "/cart/clearCart?q=" + username,
                method: "DELETE",
                contentType: "application/json",
                success: data => {

                }
              })
            }
          })

        })
        alert("Added to Orders");
        location.reload();
        
      }
    })
  });

  $("#userUpdateByAdmin").on("submit", event => {
    event.preventDefault();
    const user = {
      username: $(event.currentTarget)
        .find("[name=username]")
        .val(),
      first_name: $(event.currentTarget)
        .find("[name=first_name]")
        .val(),
      last_name: $(event.currentTarget)
        .find("[name=last_name]")
        .val(),
      password: $(event.currentTarget)
        .find("[name=password]")
        .val(),
      address: {
        address: $(event.currentTarget)
          .find("[name=address]")
          .val(),
        pincode: $(event.currentTarget)
          .find("[name=pincode]")
          .val(),
        city: $(event.currentTarget)
          .find("[name=city]")
          .val(),
        state: $(event.currentTarget)
          .find("[name=state]")
          .val(),
        country: $(event.currentTarget)
          .find("[name=country]")
          .val()
      }
    };
    $.ajax({
      url: apiServer + "/user/updateUser",
      type: "PUT",
      contentType: "application/json",
      data: JSON.stringify({
        user
      }),
      success: data => {
        alert(data.status);
        location.reload();
      }
    });
  });

  $("#form1").on("submit", event => {
    event.preventDefault();
    var username = $(event.currentTarget).find("[name=username]").val();
    // alert(username);
    // // var inputs = $('#userDelete :input');
    var user = {
      user : {
      username : $(event.currentTarget).find("[name=username]").val(),
      first_name : $(event.currentTarget).find("[name=first_name]").val(),
      last_name : $(event.currentTarget).find("[name=last_name]").val(),
      password : $(event.currentTarget).find("[name=password]").val(),
      address : {
        address : $(event.currentTarget).find("[name=address]").val(),
        pincode : $(event.currentTarget).find("[name=pincode]").val(),
        city : $(event.currentTarget).find("[name=city]").val(),
        state : $(event.currentTarget).find("[name=state]").val(),
        country : $(event.currentTarget).find("[name=country]").val(),
      }
    }
      
    }

    $.ajax({
      url: apiServer + "/user/updateUser",
      type: "PUT",
      contentType: "application/json",
      data: JSON.stringify(user),
      success: data => {
        alert(data.status);
        location.reload();
      }
    });
  });


  $("#bookDelete").on("submit", event => {
    event.preventDefault();
    // var inputs = $('#userDelete :input');
    var values = {
      seller: $(event.currentTarget)
        .find("[name=username]")
        .val(),
      title: $(event.currentTarget)
        .find("[name=title]")
        .val()
    };
    // alert(values.seller);
    // alert(values.title);
    $.ajax({
      url: apiServer + "/book/deleteBook",
      type: "DELETE",
      contentType: "application/json",
      data: JSON.stringify(values),
      success: data => {
        alert(data.status);
        location.reload();
      }
    });
  });

  $("#bookDeleteByTitle").on("submit", event => {
    event.preventDefault();
    // var inputs = $('#userDelete :input');
    var values = {

      title: $(event.currentTarget)
        .find("[name=title]")
        .val()
    };
    // alert(values.seller);
    // alert(values.title);
    $.ajax({
      url: apiServer + "/book/deleteBookByTitle?q=" + values.title,
      type: "DELETE",
      contentType: "application/json",
      data: JSON.stringify(values),
      success: data => {
        alert(data.status);
        location.reload();
      }
    });
  });

  
  $("#reviewDelete").on("submit", event => {
    event.preventDefault();
    // var inputs = $('#userDelete :input');
    var values = {
      book: $(event.currentTarget)
        .find("[name=bookToDelete]")
        .val(),
      buyer: $(event.currentTarget)
        .find("[name=reviewerUserName]")
        .val()
    };
    // alert(values.title);
    $.ajax({
      url: apiServer + "/review/deleteReview",
      type: "DELETE",
      contentType: "application/json",
      data: JSON.stringify(values),
      success: data => {
        alert(data.status);
        location.reload();
      }
    });
  });

  $("#sellerReviewDelete").on("submit", event => {
    event.preventDefault();
    // var inputs = $('#userDelete :input');
    var values = {
      seller: $(event.currentTarget)
        .find("[name=seller]")
        .val(),
      buyer: $(event.currentTarget)
        .find("[name=reviewerUserName]")
        .val()
    };
    // alert(values.seller);
    // alert(values.buyer);
    // alert(values.title);
    $.ajax({
      url: apiServer + "/sellerReview/deleteReview",
      type: "DELETE",
      contentType: "application/json",
      data: JSON.stringify(values),
      success: data => {
        alert(data.status);
        location.reload();
      }
    });
  });

  $("#reviewAdd").on("submit", event => {
    event.preventDefault();
    // var inputs = $('#userDelete :input');
    var values = {
      book: $(event.currentTarget)
        .find("[name=bookTitle]")
        .val(),
      buyer: $(event.currentTarget)
        .find("[name=reviewer]")
        .val(),
      review: $(event.currentTarget)
        .find("[name=review]")
        .val()
    };
    // alert(values.title);
    $.ajax({
      url: apiServer + "/review/addReview",
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify(values),
      success: data => {
        alert(data.status);
        location.reload();
      }
    });
  });

  $("#reviewUpdate").on("submit", event => {
    event.preventDefault();
    // var inputs = $('#userDelete :input');
    var values = {
      book: $(event.currentTarget)
        .find("[name=bookTitle]")
        .val(),
      buyer: $(event.currentTarget)
        .find("[name=reviewer]")
        .val(),
      review: $(event.currentTarget)
        .find("[name=review]")
        .val()
    };
    if(values.review == "")
      return alert("Review can't be empty!");
    // alert(values.title);
    $.ajax({
      url: apiServer + "/review/editReview",
      type: "PUT",
      contentType: "application/json",
      data: JSON.stringify(values),
      success: data => {
        alert(data.status);
        location.reload();
      }
    });
  });

  $("#sellerReviewAdd").on("submit", event => {
    event.preventDefault();
    // var inputs = $('#userDelete :input');
    var values = {
      seller: $(event.currentTarget)
        .find("[name=seller]")
        .val(),
      buyer: $(event.currentTarget)
        .find("[name=reviewer]")
        .val(),
      review: $(event.currentTarget)
        .find("[name=reviewSelection]")
        .val()
    };
    // alert(values.title);
    $.ajax({
      url: apiServer + "/sellerReview/addReview",
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify(values),
      success: data => {
        alert(data.status);
        location.reload();
      }
    });
  });


  $("#bookUpdateBySeller").on("submit", event => {
    event.preventDefault();
    // var values = {
    //     username: $(event.currentTarget).find('[name=title]').val(),
    //     first_name: $(event.currentTarget).find('[name=first_name]').val()
    // };
    var book = {
      seller: $(event.currentTarget)
        .find("[name=id]")
        .val(),
      title: $(event.currentTarget)
        .find("[name=title]")
        .val(),
      categories: $(event.currentTarget)
        .find("[name=categories]")
        .val(),
      publisher: $(event.currentTarget)
        .find("[name=publisher]")
        .val(),
      price: $(event.currentTarget)
        .find("[name=price]")
        .val(),
      publishedYear: $(event.currentTarget)
        .find("[name=publishedYear]")
        .val(),
      pagecount: $(event.currentTarget)
        .find("[name=pagecount]")
        .val()
    };

    // alert('AA');
    // alert(book.seller);a
    // alert(book.title);
    // alert(book.categories);
    // alert(book.publisher);
    // alert(book.price);
    // alert(book.publishedYear);
    // alert(book.pagecount);

    $.ajax({
      url: apiServer + "/book/updateBook",
      type: "PUT",
      contentType: "application/json",
      data: JSON.stringify({
        seller: $(event.currentTarget)
          .find("[name=id]")
          .val(),
        title: $(event.currentTarget)
          .find("[name=title]")
          .val(),
        categories: $(event.currentTarget)
          .find("[name=categories]")
          .val(),
        publisher: $(event.currentTarget)
          .find("[name=publisher]")
          .val(),
        price: {
          amount: $(event.currentTarget)
            .find("[name=price]")
            .val()
        },
        publishedYear: $(event.currentTarget)
          .find("[name=publishedYear]")
          .val(),
        pagecount: $(event.currentTarget)
          .find("[name=pagecount]")
          .val()
      }),
      success: data => {
        alert(data.status);
        location.reload();
      }
    });
  });

  $("#bookCreateBySeller").on("submit", event => {
    event.preventDefault();
    // var values = {
    //     username: $(event.currentTarget).find('[name=title]').val(),
    //     first_name: $(event.currentTarget).find('[name=first_name]').val()
    // };
    var book = {
      seller: $(event.currentTarget)
        .find("[name=id]")
        .val(),
      title: $(event.currentTarget)
        .find("[name=title]")
        .val(),
      author: $(event.currentTarget)
        .find("[name=author]")
        .val(),
      categories: $(event.currentTarget)
        .find("[name=categories]")
        .val(),
      publisher: $(event.currentTarget)
        .find("[name=publisher]")
        .val(),
      publishedDate: $(event.currentTarget)
        .find("[name=publishedYear]")
        .val(),
      price: {
        amount: $(event.currentTarget)
          .find("[name=price]")
          .val()
      },
      language: $(event.currentTarget)
        .find("[name=language]")
        .val(),
      pagecount: $(event.currentTarget)
        .find("[name=pagecount]")
        .val()
    };


    // alert(book.seller);
    // alert(book.title);
    // alert(book.author);
    // alert(book.categories);
    // alert(book.publisher);
    // alert(book.publishedDate);
    // alert(book.price.amount);
    // alert(book.language);
    // alert(book.pagecount);

    $.ajax({
      url: apiServer + "/book/addBook",
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify({
        seller: $(event.currentTarget)
          .find("[name=id]")
          .val(),
        title: $(event.currentTarget)
          .find("[name=title]")
          .val(),
        authors: [
          $(event.currentTarget)
            .find("[name=author]")
            .val()
        ],
        categories: $(event.currentTarget)
          .find("[name=categories]")
          .val(),
        publisher: $(event.currentTarget)
          .find("[name=publisher]")
          .val(),
        publishedDate: $(event.currentTarget)
          .find("[name=publishedYear]")
          .val(),
        price: {
          amount: $(event.currentTarget)
            .find("[name=price]")
            .val()
        },
        language: $(event.currentTarget)
          .find("[name=language]")
          .val(),
        pagecount: $(event.currentTarget)
          .find("[name=pagecount]")
          .val()
      }),
      success: data => {
        alert(data.status);
        location.reload();
      }
    });
  });

  $("#register").on("submit", event => {
    event.preventDefault();
    // alert("HI");
    const user = {
      username: $(event.currentTarget)
        .find("[name=username]")
        .val(),
      first_name: $(event.currentTarget)
        .find("[name=first_name]")
        .val(),
      last_name: $(event.currentTarget)
        .find("[name=last_name]")
        .val(),
      password: $(event.currentTarget)
        .find("[name=password]")
        .val(),
      usertype: $(event.currentTarget)
        .find("[name=usertype]")
        .val(),
      address: {
        address: $(event.currentTarget)
          .find("[name=address]")
          .val(),
        pincode: $(event.currentTarget)
          .find("[name=pincode]")
          .val(),
        city: $(event.currentTarget)
          .find("[name=city]")
          .val(),
        state: $(event.currentTarget)
          .find("[name=state]")
          .val(),
        country: $(event.currentTarget)
          .find("[name=country]")
          .val()
      }
    };
    // alert(user.usertype)
    if (user.usertype === 'seller') {
      $.ajax({
        url: apiServer + "/user/register",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify({
          username: $(event.currentTarget)
            .find("[name=username]")
            .val(),
          first_name: $(event.currentTarget)
            .find("[name=first_name]")
            .val(),
          last_name: $(event.currentTarget)
            .find("[name=last_name]")
            .val(),
          usertype: $(event.currentTarget)
            .find("[name=usertype]")
            .val(),
          password: $(event.currentTarget)
            .find("[name=password]")
            .val(),
          seller: {
            sellerAgreement: true,
          },
          address: {
            address: $(event.currentTarget)
              .find("[name=address]")
              .val(),
            pincode: $(event.currentTarget)
              .find("[name=pincode]")
              .val(),
            city: $(event.currentTarget)
              .find("[name=city]")
              .val(),
            state: $(event.currentTarget)
              .find("[name=state]")
              .val(),
            country: $(event.currentTarget)
              .find("[name=country]")
              .val()
          }
        }),
        success: data => {
          alert(data.status);
          setTimeout(2000, () => {
            window.location = "/";
          });
        }
      });
    }//if end
    else if (user.usertype === 'buyer') {
      $.ajax({
        url: apiServer + "/user/register",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify({
          username: $(event.currentTarget)
            .find("[name=username]")
            .val(),
          first_name: $(event.currentTarget)
            .find("[name=first_name]")
            .val(),
          last_name: $(event.currentTarget)
            .find("[name=last_name]")
            .val(),
          usertype: $(event.currentTarget)
            .find("[name=usertype]")
            .val(),
          password: $(event.currentTarget)
            .find("[name=password]")
            .val(),
          buyer: {
            buyerAgreement: true,
          },
          address: {
            address: $(event.currentTarget)
              .find("[name=address]")
              .val(),
            pincode: $(event.currentTarget)
              .find("[name=pincode]")
              .val(),
            city: $(event.currentTarget)
              .find("[name=city]")
              .val(),
            state: $(event.currentTarget)
              .find("[name=state]")
              .val(),
            country: $(event.currentTarget)
              .find("[name=country]")
              .val()
          }
        }),
        success: data => {
          alert(data.status);
          setTimeout(2000, () => {
            window.location = "/";
          });
        }
      });
    }//if end
    else if (user.usertype === 'admin') {
      $.ajax({
        url: apiServer + "/user/register",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify({
          username: $(event.currentTarget)
            .find("[name=username]")
            .val(),
          first_name: $(event.currentTarget)
            .find("[name=first_name]")
            .val(),
          last_name: $(event.currentTarget)
            .find("[name=last_name]")
            .val(),
          usertype: $(event.currentTarget)
            .find("[name=usertype]")
            .val(),
          password: $(event.currentTarget)
            .find("[name=password]")
            .val(),
          admin: {
            admin_key: '3gd5ft',
          },
          address: {
            address: $(event.currentTarget)
              .find("[name=address]")
              .val(),
            pincode: $(event.currentTarget)
              .find("[name=pincode]")
              .val(),
            city: $(event.currentTarget)
              .find("[name=city]")
              .val(),
            state: $(event.currentTarget)
              .find("[name=state]")
              .val(),
            country: $(event.currentTarget)
              .find("[name=country]")
              .val()
          }
        }),
        success: data => {
          alert(data.status);
          setTimeout(2000, () => {
            window.location = "/";
          });
        }
      });
    }//if end
  });

  //Search for books.
  $("#searchForm").on("submit", e => {
    e.preventDefault();

    const searchTerm = $(e.currentTarget)
      .find("[name=searchText]")
      .val();
    searchTerm.trim();
    if (searchTerm === '') {
      var curBook = [];
      res.render('search2', { book: curBook, user: req.user });
    }
    $.get(apiServer + "/book/search?q=" + searchTerm, res => {
      $("#searchResultsContainer").empty();
      const searchContainer = $("#searchResultsContainer");
      $.each(res, (i, book) => {
        const thumbnail = book["image"]
          ? book["image"]["thumbnail"]
          : "/images/books.jpg";
        const markup = `<div class="col-sm-2 my-2"><div data-id=${book._id} class="card book">
         <img class="card-img-top" src="${thumbnail}">
          <div class="card-body"><h6 class="card-subtitle">${
          book.title
          }</h6><p class="mb-2 text-muted card-text">${book.authors.join(
            ", "
          )}</p></div></div></div>`;

        searchContainer.append(markup);
      });
      $('.book').on("click", e => {
        e.preventDefault();
        window.location = '/books?id=' + $(e.currentTarget).attr('data-id');
      })
    });
  });

  //Login form
  $("#loginForm").on("submit", e => {
    e.preventDefault();

    const username = $(e.currentTarget)
      .find("[name=username]")
      .val();
    const password = $(e.currentTarget)
      .find("[name=password]")
      .val();
    $.ajax({
      url: "/login",
      method: "post",
      data: { username: username, password: password },
      error: err => {
        alert("Login failed. Please try again.");
      },
      success: (user) => {
        if (user.usertype === 'admin'
          || user.usertype === 'seller'
          || user.usertype === 'moderator') {
          window.location = "/loginSuccess";
        } else {
          window.location = "/";
        }
      }
    });
  });




});
