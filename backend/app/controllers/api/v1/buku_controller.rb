module Api::V1
  class BukuController < ApplicationController
    before_action :set_buku, only: [:show, :update, :destroy]

    def index
      render json: Buku.all
    end

    def show
      render json: @buku
    end

    def create
      buku = Buku.new(buku_params)
      if buku.save
        render json: buku, status: :created
      else
        render json: { errors: buku.errors.full_messages }, status: :unprocessable_entity
      end
    end

    def update
  buku = Buku.find(params[:id])
  if buku.update(buku_params)
    render json: buku
  else
    render json: { error: 'Gagal update' }, status: :unprocessable_entity
  end
end

def destroy
  buku = Buku.find(params[:id])
  buku.destroy
  head :no_content
end

    private

    def set_buku
      @buku = Buku.find(params[:id])
    end

    def buku_params
      params.require(:buku).permit(:judul, :pengarang, :tahun, :stok)
    end
  end
end
