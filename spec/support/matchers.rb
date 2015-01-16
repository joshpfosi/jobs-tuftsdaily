RSpec::Matchers.define :validate_not_in_past do |date|
  match do |subject|
    subject[date] = Time.now - 2.days
    expect(subject.valid?).to be false

    subject[date] = Time.now + 2.days
    expect(subject.valid?).to be true

    subject[date] = Date.today
    expect(subject.valid?).to be true
  end
end
