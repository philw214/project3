# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
Artist.destroy_all

Artist.create([
  {name:'Deftones', song:'Beauty School', album:'Diamond Eyes', audio_id:'beautyschool.mp3', photo_url:'deftones.jpg'},
  {name:'Alexisonfire', song:'Born and Raised', album:'Death Letter (EP)', audio_id:'bornandraised.mp3', photo_url:'alexis.jpg'},
  {name:'Nine Inch Nails', song:'Discipline', album:'The Slip', audio_id:'discipline.mp3', photo_url:'nin.jpg'},
  {name:'Bjork', song:'Joga', album:'Homogenic', audio_id:'joga.mp3', photo_url:'bjork.jpeg'},
  {name:'Lupe Fiasco', song:'The Instrumental', album:'Food & Liquor', audio_id:'the_instrumental.mp3', photo_url:'lupe.jpg'},
  {name:'Mice Parade', song:'Circle None', album:'Mice Parade', audio_id:'circle_none.mp3', photo_url:'miceparade.jpg'},
  {name:'TIAAN', song:'Dive Deep', album:'Dive Deep (Single)', audio_id:'dive_deep.mp3', photo_url:'tiaan.jpg'}
  ])
