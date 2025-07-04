class Buku < ApplicationRecord
  validates :judul, :pengarang, :tahun, :stok, presence: true
  validates :stok, numericality: { greater_than_or_equal_to: 0 }
end
