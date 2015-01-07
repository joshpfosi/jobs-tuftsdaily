class Job < ActiveRecord::Base
  validates :email, format: { with: /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i, multiline: true  }
  validates :title, :section, :coverage_type, :publish_date, :due_date, :details, presence: true
  validates :state, inclusion: { in: 0..6 }

  # TODO: Refactor some how (see project.rb)
  validate :dates

  def dates
    errors.add(:due_date, "date has occured")     if due_date.nil? || due_date < Time.now
    errors.add(:publish_date, "date has occured") if publish_date.nil? || publish_date < Time.now
  end

  belongs_to :daily_member

  scope :equal_state,     lambda { |state| where(state: state) }
  scope :not_equal_state, lambda { |state| where.not(state: state) }
  scope :is_stock,        lambda { |bool|  where(coverage_type: ['Stock', 'File Photo']) if bool }

  def self.search(params = {})
    products = params[:job_ids].present? ? Job.find(params[:job_ids]) : Job.all

    products = products.equal_state(params[:equal_state]) if params[:equal_state]
    products = products.not_equal_state(params[:not_equal_state]) if params[:not_equal_state]
    products = products.is_stock(params[:is_stock]) if params[:is_stock]

    products
  end

end
