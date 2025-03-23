import json
import os

class QuestionBank:
    def __init__(self, filepath: str = "app/question_bank.json"):
        self.filepath = filepath
        self.bank = self.load_questions()

    def load_questions(self) -> dict:
        if not os.path.exists(self.filepath):
            raise FileNotFoundError(f"Question bank file {self.filepath} not found.")
        with open(self.filepath, "r") as f:
            return json.load(f)

    def get_questions_by_feature(self, feature: str) -> list:
        """
        Retrieve questions for a specific feature.
        """
        feature_data = self.bank.get(feature)
        if feature_data:
            return feature_data.get("questions", [])
        return []

    def get_all_features(self) -> list:
        """
        Return all feature keys available in the question bank.
        """
        return list(self.bank.keys())

# Example usage:
if __name__ == "__main__":
    qb = QuestionBank()
    print(qb.get_questions_by_feature("leave_dataset"))
