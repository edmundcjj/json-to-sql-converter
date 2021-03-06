var jsonfile = require('jsonfile');
var fs = require('fs');

function read_file() {
  if (process.argv[2]) {
    var file = process.argv[2];
  } else {
    var file = 'countries.json';
  }

  jsonfile.readFile(file, function(err, obj) {
    let countries_array = obj.countries;

    convert_to_sql_insert(countries_array);
  })
}

function convert_to_sql_insert(countries) {
  var output_file = 'countries.sql';

  for (var country of countries) {
    var insert_statement = "INSERT INTO " + process.argv[3] + " (name, code) VALUES ('" + country["name"] + "','" + country["code"] + "');\n";
    fs.appendFile(output_file, insert_statement, function(err) {
      if (err)
        console.error(err);
      console.log('Appended!');
    });
  }
}

read_file();
