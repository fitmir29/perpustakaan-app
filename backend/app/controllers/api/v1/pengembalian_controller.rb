module Api::V1
  class PengembalianController < ApplicationController
    before_action :set_pengembalian, only: [:show, :update, :destroy]

    # GET /api/v1/pengembalian
    def index
      render json: Pengembalian.all
    end

    # GET /api/v1/pengembalian/:id
    def show
      render json: @pengembalian
    end

    # POST /api/v1/pengembalian
    def create
      @pengembalian = Pengembalian.new(pengembalian_params)

      if @pengembalian.save
        render json: @pengembalian, status: :created
      else
        render json: @pengembalian.errors, status: :unprocessable_entity
      end
    end

    # PUT /api/v1/pengembalian/:id
    def update
      if @pengembalian.update(pengembalian_params)
        render json: @pengembalian
      else
        render json: @pengembalian.errors, status: :unprocessable_entity
      end
    end

    # DELETE /api/v1/pengembalian/:id
    def destroy
      @pengembalian.destroy
      head :no_content
    end

    private

    def set_pengembalian
      @pengembalian = Pengembalian.find(params[:id])
    end

    def pengembalian_params
      params.require(:pengembalian).permit(:user_id, :buku_id, :tanggal_kembali)
    end
  end
end
