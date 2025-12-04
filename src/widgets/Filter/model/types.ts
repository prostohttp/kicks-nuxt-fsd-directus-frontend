export interface OptionValuesType {
  option_values: {
    option_values_id: {
      _in: string[];
    };
  };
  price: {
    _lte: number;
  };
}

export interface OptionValuesFilterType {
  option_values: {
    option_values_id: {
      _in: string;
    };
  };
  price: {
    _lte: number;
  };
}
