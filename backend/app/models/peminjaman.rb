class Peminjaman < ApplicationRecord
  belongs_to :user
  belongs_to :buku
end
