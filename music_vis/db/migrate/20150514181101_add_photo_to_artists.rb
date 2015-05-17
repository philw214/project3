class AddPhotoToArtists < ActiveRecord::Migration
  def change
    add_column :artists, :photo_url, :string
  end
end
