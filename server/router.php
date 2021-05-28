<?php

// Route URL paths
if($request->is('GET','artists')) {
	$response->artists = $db->all('SELECT * FROM `artists` ORDER BY `id`');
}

else if($request->is('GET','artists/[0-9]+')) {
	$artist_id = (int) $request->segment(1);
	$response->artist = $db->one('SELECT * FROM `artists` WHERE `id` = ?', [ $artist_id ]);
	if(!$response->artist) {
		$response->code(404);
		$response->error('404: artist Not Found.');
	}
}

else if($request->is('POST','artists/[0-9]+') || $request->is('POST','artists')) {
	$artist_id = (int) $request->segment(1, 0);
	$artist = $request->data;
	if($artist) {	
		// Check for empty names
		if(strlen($artist->first_name) < 1) $response->error('First name is empty.');
		if(strlen($artist->last_name) < 1) $response->error('Last name is empty.');
	}
	else {
		$response->error('No JSON data sent.');
	}
	
	if($response->hasErrors()) {
		$response->code(400);
		$response->error('400: Invalid input.');
	}
	else {
		if($artist_id > 0) { // update existing
			$result = $db->exec(
				'UPDATE `artists` SET `first_name`=?, `last_name`=? WHERE `id`=?', 
				[$artist->first_name, $artist->last_name, $artist_id]
			);
		}
		
		$response->artist = $db->one('SELECT * FROM `artists` WHERE `id` = ?', [$artist_id]);
		$response->info('Artist saved.');	
	}
}

else if($request->is('GET','artists/[0-9]+/movies')) {
	$artist_id = (int) $request->segment(1);
	$response->artist = $db->one('SELECT * FROM `artists` WHERE `id` = ?', [$artist_id] );
	$response->movies = [];
	if($response->artist) {
		$response->movies = $db->all('SELECT movies.id, artists.first_name, artists.last_name, movies.title, movies.yr
		 FROM artists,
		movies_artists,
		movies 
		WHERE artists.id = ? AND movies_artists.artist_id = artists.id AND movies_artists.movie_id = movies.id', [$artist_id] );
	}
	else {
		$response->code(404);
		$response->error("404: Artist with id=$artist_id not found.");
	}
}

else if($request->is('GET','movies/[0-9]+/artists')) {
	$movie_id = (int) $request->segment(1);
	$response->movie = $db->all('SELECT movies.title, artists.first_name, artists.last_name 
	FROM artists, movies_artists, movies 
	WHERE movies.id = ? AND
    movies_artists.artist_id = artists.id 
	AND movies_artists.movie_id = movies.id;', [ $movie_id ]);
	if(!$response->movie) {
		$response->code(404);
		$response->error('404: movie Not Found.');
	}
}

else {
	$response->error('404: URL Not Found: /'.$request->path);
	$response->code(404);
}

// Outputs $response object as JSON to the client.
echo $response->render();
