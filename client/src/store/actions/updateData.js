const updateData = (options, dataName) => {
  return { type: `UPDATE_${dataName}`, payload: { data: options } };
};

export { updateData };
