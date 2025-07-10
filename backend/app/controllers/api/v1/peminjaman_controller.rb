module Api
  module V1
    class PeminjamanController < ApplicationController
      before_action :set_peminjaman, only: [:show, :update, :destroy]

      def index
        render json: Peminjaman.all
      end

      def show
        render json: @peminjaman
      end

      def create
        @peminjaman = Peminjaman.new(peminjaman_params)
        if @peminjaman.save
          render json: @peminjaman, status: :created
        else
          render json: @peminjaman.errors, status: :unprocessable_entity
        end
      end

      def update
        if @peminjaman.update(peminjaman_params)
          render json: @peminjaman
        else
          render json: @peminjaman.errors, status: :unprocessable_entity
        end
      end

      def destroy
        @peminjaman.destroy
        head :no_content
      end

      private

      def set_peminjaman
        @peminjaman = Peminjaman.find(params[:id])
      end

      def peminjaman_params
        params.require(:peminjaman).permit(:user_id, :buku_id, :tanggal_pinjam, :tanggal_kembali, :status)
      end
    end
  end
end
