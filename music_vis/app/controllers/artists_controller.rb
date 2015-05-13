class ArtistsController < ApplicationController

  def index
    @artists = Artist.all
    respond_to do |format|
      format.html
      format.json{render json: @artists}
    end
  end

  def show
  end

end
