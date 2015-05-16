# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
Artist.destroy_all

Artist.create([
  {name:'Deftones', song:'Beauty School', album:'Diamond Eyes', audio_id:'beautyschool.mp3'},
  {name:'Alexisonfire', song:'Born and Raised', album:'Death Letter', audio_id:'bornandraised.mp3'},
  {name:'Nine Inch Nails', song:'Discipline', album:'The Slip', audio_id:'discipline.mp3'},
  {name:'Bjork', song:'Joga', album:'Homogenic', audio_id:'joga.mp3'}
  ])
