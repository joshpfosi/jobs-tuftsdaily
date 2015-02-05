class Job < ActiveRecord::Base
  validates :email, format: { with: /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i, multiline: true  }
  validates :title, :section, :coverage_type, :publish_date, :due_date, :details, presence: true
  validates :state, inclusion: { in: 0..6 }

  validates_date :due_date, :publish_date, :on_or_after => lambda { Date.today }
  after_validation :log_errors, :if => Proc.new {|m| m.errors}

  def log_errors
    Rails.logger.debug self.errors.full_messages.join("\n")
  end

  belongs_to :daily_member

  scope :equal_state,     lambda { |state| where(state: state) }
  scope :not_equal_state, lambda { |state| where.not(state: state) }

  def self.search(params = {})
    jobs = params[:job_ids].present? ? Job.find(params[:job_ids]) : Job.all

    jobs = jobs.equal_state(params[:equal_state]) if params[:equal_state]
    jobs = jobs.not_equal_state(params[:not_equal_state]) if params[:not_equal_state]

    jobs
  end

end
