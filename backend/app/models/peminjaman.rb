class Peminjaman < ApplicationRecord
  belongs_to :user
  belongs_to :buku

  validates :tanggal_pinjam, :tanggal_kembali, :status, presence: true
end

def create
  peminjaman = Peminjaman.new(peminjaman_params)
  if peminjaman.save
    render json: peminjaman, status: :created
  else
    render json: peminjaman.errors, status: :unprocessable_entity
  end
end

private

def peminjaman_params
  params.require(:peminjaman).permit(:user_id, :buku_id, :tanggal_pinjam, :tanggal_kembali, :status)
end
