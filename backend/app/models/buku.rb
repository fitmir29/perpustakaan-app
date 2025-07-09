class Buku < ApplicationRecord
  validates :judul, :pengarang, :tahun, :stok, presence: true
end
