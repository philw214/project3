class AddDetailsToArtists < ActiveRecord::Migration
  def change
    add_column :artists, :nationality, :string
    add_column :artists, :song, :string
    add_column :artists, :album, :string
  end
end
