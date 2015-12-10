SmartForm.Input = React.createClass({
  validations: {
    email: /^[A-Za-z0-9-._+]+@[A-Za-z0-9-]+[.A-Za-z0-9-]*\.[A-Za-z]{2,}$/,
    phone: /^\(?\d{3}[)-]?\s*\d{3}(-|\s*)\d{4}$/,
    zip: /^\d{5}$/
  },

  propTypes: {
    defaultValue: React.PropTypes.string,
    formId: React.PropTypes.string.isRequired,
    id: React.PropTypes.string.isRequired,
    required: React.PropTypes.bool,
    validateAs: React.PropTypes.any,
    weakValidation: React.PropTypes.bool
  },

  getDefaultProps() {
    return {
      required: false
    }
  },

  getInitialState() {
    return {
      errorReason: this.props.required ? SmartForm.ERROR_REQUIRED :
                   SmartForm.ERROR_NONE,
      valid: !this.props.required && true,
      value: this.props.defaultValue || ''
    }
  },

  componentDidMount() {
    FormDispatcher.dispatch('SMARTFORM_INPUT_MOUNTED', {
      formId: this.props.formId,
      id: this.props.id,
      valid: this.state.valid,
      value: this.state.value
    });

    if(!this.props.defaultValue && !this.props.value) {
      FormDispatcher.dispatch('SMARTFORM_INPUT_BLURORFOCUS', {
        errorReason: this.state && this.state.errorReason,
        event: 'blur',
        formId: this.props.formId,
        id: this.props.id
      });
    }
  },

  handleBlurOrFocus(event) {
    // Call this, just in case the field was never typed in
    this.handleChange(event);

    FormDispatcher.dispatch('SMARTFORM_INPUT_BLURORFOCUS', {
      errorReason: this.state.errorReason,
      event: event.type,
      formId: this.props.formId,
      id: this.props.id
    });

    let handler = (event.type === 'blur' && this.props.onBlur) || 
                  (event.type === 'focus' && this.props.onFocus);
    if(handler) {
      handler(
        (this.state && this.state.errorReason !== SmartForm.ERROR_NONE && this.state.errorReason),
        (this.state && this.state.value),
        this.props
      );
    }
  },

  handleChange({target}) {
    this.setState({value: target.value});

    FormDispatcher.dispatch('SMARTFORM_INPUT_CHANGED', {
      callback: this.setState.bind(this),
      props: this.props,
      validations: this.validations,
      value: target.value
    });

    if(this.props.onChange && target.value !== this.state.value) {
      this.props.onChange(
        (this.state && this.state.errorReason !== SmartForm.ERROR_NONE && this.state.errorReason),
        target.value,
        this.props
      );
    }
  },

  render() {
    return <input
      value={this.state.value}
      {...this.props}
      onBlur={this.handleBlurOrFocus}
      onChange={this.handleChange}
      onFocus={this.handleBlurOrFocus}
    />
  }
});
