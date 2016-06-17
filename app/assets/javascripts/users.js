$(document).ready(function() {
	var baseUrl = 'http://devpoint-ajax-example-server.herokuapp.com/api/v1/users';

	if (location.pathname === '/') {
		function getUsers() {
			$.ajax({
				url: baseUrl,
				type: 'GET',
				dataType: 'JSON',
			}).done(function(data) {
				var tbody = $('#users');
				tbody.children().remove();
				data.users.forEach( function(user) {
					var row = '<tr data-id="' + user.id + '" ><td>' + user.first_name + '</td>';
							row += '<td>' + user.last_name + '</td>';
							row += '<td>' + user.phone_number + '</td>';
							row += '<td>'
							row += '<button class="btn btn-danger delete">Delete</button>';
							row += '<button class="btn btn-success show">Show</button>';
							row += '<button class="btn btn-info edit">Edit</button>';
							row += '</td>'
							row += '</tr>'
							tbody.append(row);
				});
			}).fail(function(err) {
				alert("Something went wrong");
			});
		}

		getUsers();

		$(document).on('click', '.delete', function() {
			var id = $(this).closest('tr').data().id;
			deleteUser(id);
		})

		$(document).on('click', '.show', function() {
			var id = $(this).closest('tr').data().id;
			location.pathname = '/users/' + id;
		})

		function deleteUser(id) {
			$.ajax({
				url: baseUrl + '/' + id,
				type: 'DELETE',
			}).done(function() {
				getUsers();
			})
		}
	}

	var regex = /\/users\/\d+/;
	if(location.pathname.match(regex)) {
		var panel = $('#panel');
		var id = panel.data().id;
		$.ajax({
			url: baseUrl + '/' + id,
			type: 'GET',
			dataType: 'JSON',
		}).done(function(data) {
			var user = data.user;
			panel.children('#heading').html(user.first_name);
			var list = $('#user');
			var last_n = '<li>Last Name:' + user.last_name + '</li>';
			var phone = '<li>Phone Number:' + user.phone_number + '</li>';
			list.append(last_n);
			list.append(desc);
		});
	}

	$('#new_user').on('submit', function(e){
		e.preventDefault();
		$.ajax({
			url: baseUrl,
			type: 'POST',
			dataType: 'JSON',
			data: $(this).serializeArray()
		}).done(function() {
			location.pathname = '/';
		});

	})
})

