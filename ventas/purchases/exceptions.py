class CanotReserveAllProducts(Exception):
    def __init__(self, errors):
        self._errors = errors

    @property
    def errors(self):
        return self._errors
