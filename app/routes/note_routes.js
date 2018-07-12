var objectId = require('mongodb').ObjectID;

function isUrl(website){
  var regex = new RegExp("^(http[s]?:\\/\\/(www\\.)?|ftp:\\/\\/(www\\.)?|www\\.){1}([0-9A-Za-z-\\.@:%_\+~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?");
  if(regex.test(website)){
    return true;
  } else {
    return false;
  }
}

module.exports = function(app, db) {

  app.get('/recon/:website', (req, res) => {
    const website = req.params.website;
    if(isUrl(website)){
      db.collection('websites').findOne({'website':website}, function(err, result) {
        console.log(website);
      });
    }  else {
      res.send({'error':'This does not appear to be a valid website'});
    }
  });

  app.post('/recon/:website', (req, res) => {
    const website = req.params.website;
    if(isUrl(website)){
      if (db.collection('websites').count({'website':website}) > 0){
        res.send({'error':'This website already exists'})
      } else {
        db.collection('websites').insert({'website':website}, (err, result) => {
          if (err) {
            res.send({'error':'An error has occured'});
          } else {
            res.send(result.ops[0]);
          }
        });
      }
    } else {
      res.send({'error':'An error has occured'});
    }
  });


  /*

  -- this is for reference --

  // Create a note
  app.post('/notes', (req, res) => {
  	const note = { text: req.body.body, title: req.body.title}
  	db.collection('notes').insert(note, (err, result) => {
  		if (err) {
  			res.send({ 'error': 'An error has occured' });
  		} else {
  			res.send(result.ops[0]);
  		}
  	});
  	console.log(req.body);
  });

  // Read a note
  app.get('/notes/:id', (req, res) => {
  	const id = req.params.id;
  	const details = { '_id':new objectId(id) };
  	db.collection('notes').findOne(details, (err, item) => {
  		if (err) {
  			res.send({'error':'An error has occured'});
  		} else {
  			res.send(item);
  		}
  	});
  });

  app.delete('/notes/:id', (req, res) => {
  	const id = req.params.id;
  	const details = { '_id': new objectId(id) };
  	db.collection('notes').remove(details, (err, item) => {
  		if (err){

  		} else {
  			res.send('Note' + id + ' deleted!');
  		}
  	});
  });

  app.put('/notes/:id', (req, res) => {
  	const id = req.params.id;
  	const details = { '_id' : new objectId(id) };
  	const note = { text: req.body.body, title: req.body.title };
  	db.collection('notes').update(details, note, (err, result) => {
  		if (err) {
  			res.send({'error':'An error has occured'});
  		} else {
  			res.send(note);
  		}
  	});
  });

  */

};